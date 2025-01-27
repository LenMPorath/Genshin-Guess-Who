# Genshin Guess Who

[![Website](https://img.shields.io/badge/Website-genshin--guess--who.com-blue)](https://genshin-guess-who.com)

**Genshin Guess Who** is a digitalized version of the classic "Guess Who" game, featuring characters from the popular game **Genshin Impact**. Built with **SvelteKit**, **SkeletonUI**, and **TailwindCSS**, this application offers a seamless and responsive experience for desktop and mobile users.

## Features

- **Comprehensive Character List**  
  Includes all Genshin Impact characters up to version 5.4.

- **Filter by Rarity**  
  Toggle between four-star and five-star characters using a slider.

- **Mark and Manage Characters**

  - Left-click to mark characters and cross them out.
  - **Hide Marked Characters**: Toggle slider to remove crossed-out characters from the visible list.
  - **Undo**: Revert the last marking/unmarking action.
  - **Reset Characters**: Clear all markings.

- **Light/Dark Mode**  
  Toggle between light and dark themes to suit your preference.

- **Responsive Design**  
  Optimized for both desktop and mobile devices.

## Deployment

The application is automatically deployed via GitHub Actions.

- **Deploy Workflow**: Executes the deployment job.
- **PR Workflow**: Executes linting and (currently disabled) test jobs.

Deployment is managed using **Docker** to create an image, and the application is hosted on a private server using **nginx-proxy-manager**.

## Versioning

The application follows a structured versioning format:  
`X.Y.Za`

- **X**: Major Version - Overhauls of the entire application.
- **Y**: Minor Version - Big new features or additions.
- **Z**: Regular Version - Updates with newly released characters.
- **a**: Optional Alphabetical Suffix - Aesthetic design changes or bug fixes.

Whenever the `main` branch is updated, the application is deployed automatically.

## Contributing

We welcome contributions! Please follow these steps:

1. **Create an Issue**: Propose the feature you want to implement. Wait for approval before proceeding.
2. **Versioning**: Ensure you update the versioning in both `package.json` and the `+layout.svelte` headline.

## Technologies Used

- **SvelteKit**: Frontend framework for building the application.
- **SkeletonUI**: Provides pre-styled components and UI elements.
- **TailwindCSS**: For styling and responsive design.
- **Docker**: Used to create and manage the application image.
- **nginx-proxy-manager**: Simplifies domain management and hosting.

---

## Disclaimer

"**Genshin Guess Who**" aka. "**genshin-guess-who.com**" is an independent, fan-created website and is not affiliated with or endorsed by **HoYoverse**.

**Genshin Impact**, along with all associated game content, character designs, images, and materials, are trademarks and copyrights owned by **HoYoverse**.

All visuals, trademarks, and intellectual properties displayed on this website belong to their respective owners and are used here solely for non-commercial, entertainment, and informational purposes.

This website is intended for fan enjoyment and community engagement. If you have any concerns regarding copyright or intellectual property, please contact me directly via Discord (**shuryo**).
