# [Rick and Morty App]()

This app was built using React and allows users to explore characters from the Rick and Morty series through an interactive interface. It features pagination to display 20 characters per page, filtering options, and a detailed view for each character.

## Features:

1. Character List with Pagination: The app displays Rick and Morty characters using cards, with 20 characters shown per page. Pagination allows users to navigate through the dataset easily.

2. Character Details Popup: Clicking on a character card opens a popup with more detailed information about the selected character.

3. Filtering Options: Users can filter characters by:
  - Gender
  - Status (alive, dead, unknown)
  - Species

4. Search by Name: A search bar allows users to search for characters by name.

## Building with:

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)

## Project structure

    |-src
    ├── api                # Get Rick and Morty API
    ├── components         # Common ui components
    ├─--- __tests__        # Tests for main components
    ├── hooks              # Hooks necesarys
    ├─- pages              # Main pages: Characters, Episodes, Locations
    └─App                  # api services and axios instances

## Project setup

To run this project locally, you need the following requirements:

- Install dependencies with `npm install`
- Set the exact Node.js version through nvm, using `nvm use`
- Run project with `npm run dev`

> If you prefer to skip these steps, you can also view the deployed version of the project on Vercel at the following [link](https://rick-and-morty-app-tau-five.vercel.app/).