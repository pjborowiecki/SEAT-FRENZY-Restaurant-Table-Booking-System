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

**<u>This project is still in development. Please check back soon.</u>**

The goals is not only to make it a table booking system, but also a full restaurant management system, allowing restaurant owners to manage their bookings, menus, and other information displayed on the website.

<br>
<!-- TECH STACK -->

## Tech Stack:

- **Framework:** [Next.js 13](https://nextjs.org)
- **Styling:** [Tailwind CSS](https://tailwindcss.com)
- **UI Components:** [shadcn/ui](https://ui.shadcn.com)
- **Database:** [PlanetScale MySQL](https://planetscale.com/)
- **ORM:** [Drizzle ORM](https://orm.drizzle.team/)
- **Authentication:** [Clerk](https://clerk.com/)
- **Forms:** [React Hook Form](https://react-hook-form.com)
- **Email:** [React Email](https://react.email)
- **Validation:** [Zod](https://zod.dev/)
- **Hosting:** [Vercel](https://vercel.com)
- **Project Management:** [Jira](https://www.atlassian.com/software/jira)

<br>
<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->

## License

Distributed under the MIT License.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

Piotr Borowiecki - [@pjborowiecki](https://www.linkedin.com/in/pjborowiecki/) - hello@pjborowiecki.com

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## TODO:

- [ ] Update headers
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
