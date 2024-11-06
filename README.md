# Blog Dashboard 

This is a simple Blog Dashboard application built with **Next.js** and **TypeScript**. It allows users to view a list of posts, filter posts by user, view post details, and add or delete comments. The application uses the **JSONPlaceholder API** to fetch mock data.

## Features

- **Posts List Page**
  - Displays a list of posts fetched from the `/posts` endpoint of the JSONPlaceholder API.
  - Each post is shown in a card format with:
    - Post title
    - Post body (truncated to 100 characters)
    - Author’s name
  - Includes a "View Details" link to view the full post.

- **Post Detail Page**
  - Displays the full post title and body, along with the author's name.
  - Displays a list of comments for the post, showing the commenter name and comment body.
  - A form to add a new comment is available, and comments are added to the list upon submission.
  - Simulates deleting a comment by removing it from the displayed list (without making an API request).

- **Filter by User**
  - A dropdown to filter posts by author.
  - Fetches and displays a list of users from the `/users` endpoint of the JSONPlaceholder API.

- **Responsive Design**
  - The application is responsive, ensuring it looks good on both desktop and mobile screens.

- **Bonus (Optional)**
  - **Loading and Error Handling**: Displays a loading indicator while data is being fetched and handles API request errors.
  - **Pagination**: Implements pagination to limit the number of posts displayed per page.

## Technologies Used

- **Next.js**: A React framework for server-rendered applications.
- **TypeScript**: A superset of JavaScript that adds static types.
- **JSONPlaceholder API**: A free online REST API that provides mock data for posts, users, and comments.
- **Vercel**: The application is deployed on Vercel for easy hosting and scalability.

## Setup and Installation

To get started with this project locally, follow these steps:

### 1. Clone the repository:

```bash
git clone https://github.com/umeshyadav7988/blog-dashboard.git
```

### 2. Navigate to the project folder:

```bash
cd blog-dashboard
```

### 3. Install dependencies:

Make sure you have **Node.js** and **npm** installed. Then, run the following command to install the necessary dependencies:

```bash
npm install
```

or if you're using **Yarn**:

```bash
yarn install
```

### 4. Run the development server:

To start the development server, run the following command:

```bash
npm run dev
```

or with **Yarn**:

```bash
yarn dev
```

The app will be running on [http://localhost:3000](http://localhost:3000).

### 5. Build and deploy the app (Optional):

To create a production build, run the following:

```bash
npm run build
```

Then, to start the production server:

```bash
npm run start
```

### 6. Deployment on Vercel

This project is deployed on Vercel. You can access the live application at:

[https://blog-dashboard-jlis-36hcgio96-umeshs-projects-defe119c.vercel.app](https://blog-dashboard-jlis-36hcgio96-umeshs-projects-defe119c.vercel.app)



## Contribution

Feel free to open issues and submit pull requests if you want to contribute to this project. Please follow the standard GitHub workflows for contributing.

