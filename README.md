# Civitas - Community Empowerment Platform

Civitas is a modern web application designed to empower communities by providing tools for discussion moderation, sentiment analysis, and user management. Built with React and Vite, Civitas offers a seamless and responsive user experience.

## Features

- **Dashboard**: View and fetch the latest posts from various subreddits.
- **Evaluation**: Analyze text for hate speech and sentiment using advanced AI models.
- **Moderation Queue**: Manage flagged and unflagged posts with detailed insights.
- **User Management**: Administer user roles and permissions.
- **Settings**: Customize application preferences.
- **API Access**: Manage API keys for external integrations.

## Technologies Used

- **Frontend**: React, Vite, React Router
- **Styling**: CSS, responsive design
- **Icons**: Lucide React
- **Charts**: Chart.js
- **Backend Integration**: REST API for data fetching and analysis

## Getting Started

Follow these steps to set up and run the project locally:

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/civitas.git
   cd civitas
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:5173
   ```

### Build for Production

To build the project for production, run:
```bash
npm run build
```
The output will be in the `dist` folder.

### Linting

To check for linting issues, run:
```bash
npm run lint
```

## Folder Structure

```
civitas/
├── src/
│   ├── components/       # React components
│   ├── App.jsx           # Main application component
│   ├── main.jsx          # Entry point
│   ├── App.css           # Global styles
│   ├── index.css         # CSS variables and base styles
├── public/               # Static assets
├── vite.config.js        # Vite configuration
├── eslint.config.js      # ESLint configuration
├── README.md             # Project documentation
```

## Deployment

Civitas is optimized for deployment on platforms like Netlify or Vercel. Ensure the `base` property in `vite.config.js` is set to `/` for proper routing.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add feature-name"
   ```
4. Push to your branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Vite](https://vitejs.dev/)
- [React](https://reactjs.org/)
- [Lucide Icons](https://lucide.dev/)
- [Chart.js](https://www.chartjs.org/)
