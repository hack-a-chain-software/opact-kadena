[WeedWay](https://www.weedway.com.br/)
==========

## Guidelines
* Use the present tense ("Add feature" not "Added feature") and the imperative mood ("Move class to..." not "Moves class to...") on commits and use the name issue on pull requests.
* Pull requests must be reviewed before merged.
* Done is better than perfect. Does it work as expected? Ship now, iterate later.
* All contributions must have tests. Remember to verify the [Github Actions CI status](https://github.com/weedway/monorepo/actions/workflows/CI.yaml).
* Every commit is checked using [Github Actions](https://github.com/weedway/monorepo/actions).
* If the CI status are not passing, the deploy will not work.

## Coding Style

- CSS: https://github.com/airbnb/css
- Javascript: https://github.com/airbnb/javascript
- Vue: https://vuejs.org/style-guide/

## Task Management
* GitHub Issues is used to track all tasks that needed to be done.
* WeedWay board is used to get a decent look on what's going on wright now.
* Every two weeks all done tasks are put together in a Milestone and the current Sprint is closed.
* Issues Board: https://github.com/orgs/weedway/projects/1

## Directory Structure
In our project, Nuxt.js is used in combination with Nuxt Layer to manage various applications as individual layers. This unique structure allows us to segregate our codebase based on their functionality or scope and handle each layer as a separate Nuxt.js application.

Here's a brief overview of the structure:

```bash
.
├── apps              # Nuxt Layer
│   └── admin         # Admin Panel
│   └── auth          # Authentication
│   └── blog          # Blog
│   └── landing       # Landing Page
├── components        # Global Components
├── content           # Nuxt Content
├── layouts           # Layouts
├── plugins           # Plugins
├── stores            # Stores
├── ui                # UI Component Library
├── app.config.ts     # Application Config
```

Each of the applications under the apps directory is its own distinct Nuxt.js application. They are logically separated, allowing each to be developed independently. This architecture offers opportunities for code organization, separation of concerns, and flexibility.

For instance, admin contains the code for the administration panel, auth deals with authentication, blog handles the blog features, and landing manages the landing page.

app.config.ts is the main configuration file for the entire application.

This multi-layered architecture, powered by Nuxt.js and Nuxt Layer, provides a robust and scalable framework to build complex and efficient web applications.

## Features
- [Nuxt 3](https://v3.nuxtjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- State management with [Pinia](https://pinia.vuejs.org/)
- Easy form validation with [vee-validate](https://vee-validate.logaretm.com/v4/)
- Custom authentication store via [`useAuthStore`](./stores/auth.ts)
- Modular with [Nuxt Layer](https://nuxt.com/docs/getting-started/layers)

## Installation
WeedWay is powered by [**Nuxt**](https://nuxt.com/).

If you have any problems configuring your enviroment, remember to read the [Nuxt Documentation](https://nuxt.com/docs).

-----------------

#### Steps
1) Clone the repository:
```bash
$ gh repo clone weedway/monorepo
$ cd monorepo
```

2) Check all packages and copy the .env.example file and edit it with your environment config:
```bash
$ cp ./front/.env.example ./front/.env
```

3) Install frontend dependencies via PNPM
```bash
$ pnpm install
```

When working on frontend, run `pnpm front dev`. Files will be compiled, concatenated and the browser will auto update.
