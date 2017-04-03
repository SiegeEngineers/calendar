# AoE2Calendar.com: a calendar for pro Age of Empires

[![Site](http://i.imgur.com/09l46u3.png)](aoe2calendar.com)

#### Management interface
![Edit](http://i.imgur.com/d1V90Awl.png)

#### Contributing
  - AoE2calendar is  written in React, specifically [next.js](https://github.com/zeit/next.js/)
  - *Collaborating:*
    - there's a small Discord group to discuss planning, ping me on Discord (patão#8153) and I'll add you :)
    - to get access to the source sheet just ping me on Discord (patão#8153) or AoCzone.net (patao)
  - *Running:*
    - Using NPM:
        - You can use `yarn install` or `npm install` to install dependencies;
        - Run `npm run dev`;
    - Using docker: `docker-compose up`
  - Feel free to open Github issues, I'll check them!

#### Deploy
- AoE2calendar using [hyper.sh](https://hyper.sh) as production environment, to deploy a new version is required configure [hyper console](https://docs.hyper.sh/GettingStarted/install.html).
- Deploying all containers, execute `npm run now`
  - Containers will be upload to docker-hub;
  - Hyper.sh update images;
  - Hyper.sh destroy and create new containers with new version;
- To deploy specifically container execute:
  - `npm run now <container>`
  - Example:
      - `npm run now aeo2calendar` - Deploy web app;
      - `npm run now aeo2calendar-proxy` - Deploy reverse proxy;

##### Plan
  - The goal for the site itself is to eventually add more features like VoDs as well as integrations with other AoE2 projects
  - A side-goal for the project is to drive an event calendar on reddit.com and possibly for aoczone.net / streamers as well

##### Notes
  - Hot reloading requires running on localhost. If you're running remotely, you can use Fiddler to remap localhost to remote IP.
