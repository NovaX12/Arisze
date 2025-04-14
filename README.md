# Arisze - The Ultimate Student Hub!

Arisze is a web platform designed to be the central hub for students, helping them plan, connect, and enjoy their university experience. Explore events, connect with fellow students, get personalized recommendations, and discover new opportunities tailored just for you.

## ✨ Key Features

* **Homepage:** Engaging visuals with interactive background shapes animated on logo click.
* **User Dashboard:** Personalized space after login, showcasing key actions and AI recommendations.
* **Events & Activities:** Browse upcoming events with category-based filtering and dynamic image thumbnails.
* **AI Recommendation Engine:** Get tailored activity suggestions based on interests via the Dashboard and a dedicated AI Recommendations page.
* **Community Page:** View user-generated posts. *(Note: Like/Comment/Share buttons are currently placeholder/showcase functionality)*.
* **Contact Us Form:** Integrated with Formspree (`myzeorjq`) for direct email submission, featuring real-time validation (required fields, email format, character limits for Subject & Message) and visual feedback.
* **Responsive Design:** Optimized experience across mobile, tablet, and desktop devices.
* **Dark Mode:** Toggle between light and dark themes for visual comfort.
* **Consistent Layout:** Standardized page structure across all main sections.
* **Refined Footer:** Includes updated social links (Instagram, LinkedIn) and horizontally aligned navigation links.

## 💻 Tech Stack (Assumed)

* **Frontend:** React.js (based on Formspree integration example)
* **Styling:** CSS / [Specify Framework if used, e.g., Tailwind CSS, Material UI]
* **Form Handling:** Formspree (`@formspree/react`)
* **Deployment:** Vercel (inferred from preview URL)
* **Package Manager:** npm / yarn

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

* Node.js (v18.x or later recommended)
* npm or yarn

### Installation

1.  **Clone the repository:**
    ```bash
    git clone [YOUR_REPOSITORY_URL]
    cd [YOUR_PROJECT_DIRECTORY_NAME]
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```
3.  **Environment Variables (if applicable):**
    * If there are any environment variables required (e.g., API keys other than Formspree ID), create a `.env` file in the root directory.
    * Copy the contents of `.env.example` (if it exists) to `.env`.
    * Fill in the necessary values in your `.env` file.
    ```bash
    # Example .env file content (if needed)
    # REACT_APP_SOME_API_KEY=your_api_key_here
    ```

### Running the Development Server

```bash
npm run dev
# or
yarn dev
Open http://localhost:3000 (or the specified port) to view it in the browser.
 ```
The page will reload if you make edits.
🔧 UsageAfter installation, run the development server command.
This will launch the application locally, allowing you to interact with the features and test changes.

🤝 ContributingContributions are welcome!
If you'd like to contribute, please follow these steps:Fork the ProjectCreate your Feature Branch (git checkout -b feature/AmazingFeature)
