# MyBlogAngular - A Modern Blog Application

This is a modern, feature-rich blog application built using Angular. It allows users to browse blog posts, view individual posts, and potentially search for specific content. The application is designed to be responsive and provide a great user experience.

## Features

- **Browse Blog Posts:** View a list of all published blog posts.
- **Individual Post Pages:** Read full blog posts with detailed content.
- **Clean and Modern UI:** A user-friendly interface.
- **Routing:** The application uses Angular Router for navigation.
- **Forms:** The application uses Angular Forms for user input.
- **State Management:** The application uses NgRx for state management.

## Dependencies

This project relies on the following key dependencies:

- **Angular Core:** `@angular/core`, `@angular/common`, `@angular/compiler`, `@angular/platform-browser`, `@angular/platform-browser-dynamic` - The core Angular framework.
- **Angular Router:** `@angular/router` - For navigation between different views.
- **Angular Forms:** `@angular/forms` - For handling forms.
- **Angular HTTP Client:** `@angular/common/http` - For making HTTP requests to fetch blog data.
- **RxJS:** `rxjs` - For reactive programming.
- **NgRx:** `@ngrx/store`, `@ngrx/effects` - For state management (if used).

## Setup Instructions

1.  **Prerequisites:**

    - Node.js (version 18 or higher recommended) and npm (or yarn) installed.
    - Angular CLI installed globally: `npm install -g @angular/cli`

2.  **Clone the Repository:**

    ```bash
    git clone <repository-url>
    cd my-blog-angular
    ```

3.  **Install Dependencies:**
    ```bash
    npm install
    ```
    or
    ```bash
    yarn install
    ```

## Running the Application

1.  **Start the Development Server:**

    ```bash
    npm run dev
    ```

    This command will start a local development server.

2.  **Open in Browser:**
    Open your web browser and navigate to `http://localhost:4200/`.

3.  **Automatic Reload:**
    The application will automatically reload whenever you make changes to the source files.

## Building for Production

1.  **Build Command:**

    ```bash
    ng build --configuration production
    ```

    This command will create an optimized production build of the application.

2.  **Output Directory:**
    The build artifacts will be located in the `dist/my-blog-angular` directory.

3.  **Serving production build:**
    You can serve the production build using any static server. For example, you can use `http-server`:
    ```bash
    npm install -g http-server
    cd dist/my-blog-angular
    http-server -p 8080
    ```
    Then open your browser and navigate to `http://localhost:8080/`.
