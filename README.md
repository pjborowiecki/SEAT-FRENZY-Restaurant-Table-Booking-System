<div>
  <h1 align="center">SeatFrenzy</h1>
  <h3 align="center">Restaurant Table Booking System</h3>
  <p align="center">
    <a href="https://github.com/pjborowiecki/SeatFrenzy-Restaurant-Table-Booking-System.git/issues">Report Bug</a>
    ·
    <a href="https://github.com/pjborowiecki/SeatFrenzy-Restaurant-Table-Booking-System.git/issues">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#about-the-project">About The Project</a></li>
    <li><a href="#feedback-received">Tech Stack</a></li>
    <li><a href="getting-started">Getting Started</li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About the Project

![public/images/screenshot](./public/images/screenshots/screenshot1.png)
<br>

![public/images/screenshot2](./public/images/screenshots/screenshot2.png)
<br>

![public/images/screenshot3](./public/images/screenshots/screenshot3.png)
<br>

**SeatFrenzy** is a restaraunt booking system, allowing visitors to quickly check availability and easily book a table at their favourite restaurant. It also allows restaurant owners to promote their venues by listing them on the website, and to manage their bookings or information displayed on the website.

**<u>This project is currently in development. Please check back soon.</u>**

The goals is not only to make it a table booking system, but also a full restaurant management system, allowing restaurant owners to manage their bookings, menus, and other information displayed on the website.

<p align="right">(<a href="#readme-top">back to top</a>)</p>
<br>

<!-- TECH STACK -->

## Tech Stack

- **Framework:** [Next.js 13](https://nextjs.org)
- **Styling:** [Tailwind CSS](https://tailwindcss.com)
- **UI Components:** [shadcn/ui](https://ui.shadcn.com)
- **Database:** [PlanetScale MySQL](https://planetscale.com/)
- **ORM:** [Drizzle ORM](https://orm.drizzle.team/)
- **Authentication:** [Clerk](https://clerk.com/)
- **File Upload:** [UploadThing](https://uploadthing.com/)
- **Forms:** [React Hook Form](https://react-hook-form.com)
- **Email:** [React Email](https://react.email)
- **Validation:** [Zod](https://zod.dev/)
- **Hosting:** [Vercel](https://vercel.com)
- **Project Management:** [Jira](https://www.atlassian.com/software/jira)

<p align="right">(<a href="#readme-top">back to top</a>)</p><br>

<!-- GETTING STARTED -->

## Getting Started <br><br>

#### Prerequisites:

- [Node.js (version 18 or higher)](https://nodejs.org)
- [pNPM](https://pnpm.io)
- [Ngrok](https://ngrok.com)
  <br>

#### Installation:

<br>

1.  Clone the repo

    ```sh
    git clone
    ```

    <br>

2.  Install packages

    ```sh
     pnpm install
    ```

    <br>

3.  Rename a `.env.example` file in the project's root directory and fill in the required values. See below for details on obtaining the keys:
    <br>

    - **Clerk:** <br><br>

      - Create a new account with [Clerk](https://clerk.com)
      - _ToDo:_ Complete the setup instructions <br><br>

    - **PlanetScale:** <br><br>

      - Create a new account with [PlanetScale](https://planetscale.com)
      - _ToDo:_ Complete the setup instructions <br><br>

    - **UploadThing:** <br><br>

      - Create a new account with [UploadThing](https://uploadthing.com)
      - _ToDo:_ Complete the setup instructions <br><br>

    - **Ngrok**: <br><br>

      - _NOTE_: The reason for using Ngrok is to sync users data to our backend. Since authentication and user management happens on Clerk's side, data eventually need to reach the application's back end to allow for creating more complex relations in our database schemas. Clerk provides a way to do that via webhooks, but it requires a public URL. Ngrok allows us to create a tunnel to our local server, so we can test the webhooks locally. The details of the setup can be found [here](https://clerk.com/docs/users/sync-data-to-your-backend). See [this page](https://ngrok.com/docs/integrations/clerk/webhooks/) for instructions on how to set up Ngrok with Clerk for local development.

      ![clerkNgrokWebhookIllustration](https://clerk.com/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fe1ql88v4%2Fproduction%2F344b217021b87801cc586c96df20c0fd713a795c-2775x2106.png%3Ffit%3Dmax%26auto%3Dformat&w=1920&q=75)

      - Ensure you have ngrok installed on your machine
      - Create a new account at [Ngrok](https://ngrok.com)
      - Go to `Yout Authtoken` tab on the left-hand side of the dashboard and copy the token
      - Run `ngrok config add-authtoken <your_auth_token>` in your terminal window <br><br>

    - **Svix:** <br><br>

      - _NOTE_: Because of the way webhooks work, attackers can impersonate services by simply sending a fake webhook to an endpoint. Think about it: it's just an HTTP POST from an unknown source. This is a potential security hole for many applications, or at the very least, a source of problems. In order to prevent it, Svix signs every webhook and its metadata with a unique key for each endpoint. This signature can then be used to verify the webhook indeed comes from Svix, and only process it if it is. <br><br>

      - Create a new account with [Svix](https://svix.com)
      - Follow the instructions to add a new app by pasting the commands given in your dashboard into your terminal window
      - Create a new API Access token and add it to your `.env` file as `SVIX_AUTHTOKEN`<br><br>

<p align="right">(<a href="#readme-top">back to top</a>)</p><br>

#### Development: <br><br>

4. Start the development server

   ```sh
   pnpm dev
   ```

   <br>

5. Start the ngrok tunnel in another terminal window

   ```sh
    ngrok http 3000
   ```

   <br>

6. Copy the forwarding address (e.g., https://ffe6-185-171-71-142.ngrok-free.app) from the terminal output <br><br>

7. Go to your Clerk account dashboard, click on `Webhooks` tab on the left-hand side menu, and click on `Add Webhook` button. Paste the forwarding address into the `Endpoint Url` field. Scroll to the bottom of the `Message Filtering` section and select all user events: `user.created`, `user.deleted`, and `user.updated`. Click on `Create` button. <br><br>

8. Copy the `Signing Secret` from the `Webhooks` tab and add it to your `.env` file as `CLERK_WEBHOOK_SECRET`. <br><br>

9. Detailed instructions for testing can be found [here](https://ngrok.com/docs/integrations/clerk/webhooks/). The output from step 5 should include a `Web Interface` local address, which is usually [http://localhost:4040](https://localhost:4040) and can be accessed for inspecting the webhook requests. When you click on a request, you can see details of both the request and the response. <br><br>

10. Your app should be available at [http://localhost:3000](https://localhost:3000)
    <br>

<p align="right">(<a href="#readme-top">back to top</a>)</p><br>

#### Deployment:

ToDo: Complete the deployment instructions

<p align="right">(<a href="#readme-top">back to top</a>)</p>
<br>

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Run code formatting (`pnpm format`)
5. Run code linting (`pnpm lint`)
6. Push to the Branch (`git push origin feature/AmazingFeature`)
7. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->

## License

Distributed under the MIT License.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

Piotr Borowiecki - [@pjborowiecki](https://www.linkedin.com/in/pjborowiecki/) - hello@pjborowiecki.com

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## ToDo

- [ ] Integrate Clerk database with the app database schema via webhooks
- [ ] Refactor and improve the Clerk auth webhook handler
- [ ] Update headers (merge into one component with variants)
- [ ] Fix the `getVenuesAction` server action
- [ ] Finish the `venues` component
- [ ] Modify validation, so venues with the same name are allowed, as long as they are in different locations
- [ ] Modify the venue model, so it is possible to define multiple opening and closing times for each day of the week
- [ ] Decide on the `cuisine` and `location` types for a Venue model, then update forms, schemas, and validations accordingly
- [ ] Decide on the `opening time` and `closing time` types for a Venue model, then update forms, schemas, and validations accordingly
- [ ] Decide on the `date` and `time` types for a Booking model, then update forms, schemas, and validations accordingly
- [ ] Complete the loading pages
- [ ] Make the search bar functional
- [x] Fix hydration errors (ui/card component)
- [ ] Finish styling components
- [ ] Fix and improve responsiveness
- [ ] Finish the booking and venue forms (with validations)
- [x] Add auth form validation
- [x] Add authentication
- [ ] Add blogging functionality
- [ ] Add a newsletter
- [ ] Create the terms and conditions pages
- [ ] Crete the privacy policy page
- [ ] Create the about page
- [ ] Create the contact page
- [ ] Create the faq page
- [ ] Add email notifications
