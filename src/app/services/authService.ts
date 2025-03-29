import { Injectable, OnDestroy } from '@angular/core';
import { User, AuthError, Session } from '@supabase/supabase-js';
import {
  BehaviorSubject,
  Observable,
  Subscription,
  from,
  of,
  switchMap,
  tap,
} from 'rxjs';
import sb from './supabase';
import { hasAuthorProfile } from './author.service';

interface LoadingState {
  isLoading: boolean;
}

export interface AuthState {
  user: User | null;
  isAuthor: boolean | null;
  initState: LoadingState;
  loginState: LoadingState;
  signupState: LoadingState;
  logoutState: LoadingState;
}

const initialLoading = { isLoading: false };

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnDestroy {
  private _authState = new BehaviorSubject<AuthState>({
    user: null,
    isAuthor: null,
    initState: initialLoading,
    loginState: initialLoading,
    signupState: initialLoading,
    logoutState: initialLoading,
  });

  public authState$: Observable<AuthState> = this._authState.asObservable();
  private authSubscription: Subscription;

  constructor() {
    this.authSubscription = this.initAuth().subscribe();
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }

  get authState(): AuthState {
    return this._authState.value;
  }

  private setAuthState(newState: Partial<AuthState>): void {
    this._authState.next({ ...this.authState, ...newState });
  }

  login(
    email: string,
    password: string
  ): Observable<{
    data: { user: User | null; session: Session | null };
    error: AuthError | null;
  }> {
    this.setAuthState({ loginState: { isLoading: true } });
    return from(sb.auth.signInWithPassword({ email, password })).pipe(
      tap((response) => {
        this.setAuthState({ loginState: { isLoading: false } });
        if (response.data.user) {
          this.setAuthState({ user: response.data.user });
          this.checkIsAuthor(response.data.user.id).subscribe();
        }
      })
    );
  }

  signUp(
    email: string,
    password: string
  ): Observable<{
    data: { user: User | null; session: Session | null };
    error: AuthError | null;
  }> {
    this.setAuthState({ signupState: { isLoading: true } });
    return from(sb.auth.signUp({ email, password })).pipe(
      tap((response) => {
        this.setAuthState({ signupState: { isLoading: false } });
        if (response.data.user) {
          this.setAuthState({ user: response.data.user });
        }
      })
    );
  }

  logOut(): Observable<{ error: AuthError | null }> {
    this.setAuthState({ logoutState: { isLoading: true } });
    return from(sb.auth.signOut()).pipe(
      tap(() => {
        this.setAuthState({
          logoutState: { isLoading: false },
          user: null,
          isAuthor: null,
        });
      })
    );
  }

  checkIsAuthor(userId: string): Observable<boolean> {
    this.setAuthState({ initState: { isLoading: true } });
    return from(hasAuthorProfile(userId)).pipe(
      tap((response) => {
        this.setAuthState({
          isAuthor: response,
          initState: { isLoading: false },
        });
      })
    );
  }

  initAuth(): Observable<void> {
    return from(sb.auth.getSession()).pipe(
      switchMap((session) => {
        const user = session.data.session?.user ?? null;
        console.log('User:', user);
        this.setAuthState({ user });
        return user ? this.checkIsAuthor(user.id) : of(false);
      }),
      switchMap(() => {
        return new Observable<void>((observer) => {
          const { data: authListener } = sb.auth.onAuthStateChange(
            (_event, session) => {
              this.setAuthState({ user: session?.user ?? null });
            }
          );
          observer.next();
          return () => authListener.subscription.unsubscribe();
        });
      })
    );
  }
}
