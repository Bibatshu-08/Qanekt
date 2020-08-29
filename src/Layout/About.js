import React from "react";
import { motion } from "framer-motion";
import "./about.css";
import collab from "./collab.svg";
import team from "./team.svg";

export default function About() {
  return (
    <motion.div
      initial={{ x: -1000 }}
      animate={{ x: 0 }}
      exit={{ x: 1500 }}
      className="about"
    >
      <div className="incentive">
        <div className="text">
          <h1>Our Incentive</h1>
          <p>
            <strong>#Connect.Innovate.Inspire,Explore</strong>
            <br />
            <br />
            Ever had this moment as you take a deep cleansing shower when an
            idea pops up in your head, a marvelous one that you never had
            before. You start to suddenly plot all the steps you should take and
            hurdles you might face, but as you come out, it simply disappears.
            Now, where do they disappear to? Why do only a miniscule of these
            ideas ever see the light of the day?
            <br />
            <br />
            As you step into reality, the harsh world sinks in, which is
            unfortunate as our society doesn’t encourage individuals to purse
            these wild dreams and take a risk for once. But we are always taken
            into arms, following the safe routes that have been already laid
            out. We are always missing out on the beautiful ideas that fill our
            head because either we fear defying the stereotype built in our
            society, or we don’t have the resources, or we don’t have any
            experiences. We ask ourselves, If only there were others who thought
            like us, enjoy things like us, and share interests similar to us.
            <br />
            <br />
            But wait, there are! There are individuals everywhere with their own
            ideas or people who have the expertise, waiting for a day when they
            can finally come up with a eureka moment. Wouldn’t it be nice if
            these individuals can support each other and craft marvelous things
            that are only limited to their own imagination? And this is the
            incentive of our small initiative. We are a platform which aims to
            provide you an opportunity to meet like-minded, interesting people
            around you and connect with them based on the interesting things
            that cook in both of your heads. Those people would be the ones you
            can regularly meet and work with. People with whom you can learn and
            share valuable experiences. People with whom you can garnish enough
            strength to strive forward towards a common goal. Because we believe
            that every interest matter. Every idea matters. Each curiosity
            should deserve an opportunity. Because they are ours, and they are
            priceless.
          </p>
        </div>
        <div className="image">
          <img src={collab} className="collabimage" />
        </div>
      </div>
      <div className="our-team">
        <div className="image">
          <img src={team} className="team" />
        </div>
        <div className="text">
          <h1>Who Are We?</h1>
          <p>
            We are a group of young and ambitious tech enthusiasts driven to
            bring changes in the society through technology. It’s our cohesive
            belief that the problems we, or our previous generations faced, can
            be solved today by leveraging on the modern advancement of
            technology, which was the root behind the incentive. All four of us
            have felt somewhere in life that we could not explore more, innovate
            more, and collaborate more despite having constant curiosities and
            ideas bubbling in our heads. Now, although we cannot go back to the
            past and change it, we want to secure at least a platform that might
            help humanity to innovate more in the coming days. Yes, we are just
            passing by youngsters diverse in every aspect yet driven by the
            common goal to create an innovative and prosperous future.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
