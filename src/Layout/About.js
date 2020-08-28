import React from "react";
import { motion } from "framer-motion";
import './about.css'
import collab from './collab.svg';
import team from './team.svg';

export default function About(){
  return(
  <motion.div exit={{ x: 1000 }} className="about">

    <div className="incentive">
      <div className="text">
      <h1>Our Incentive</h1>
        <p>Every time we do something that we are genuinely interested in, an idea sparks inside our head. “Hey, how about doing this? Wouldn’t it be wonderful?”, we all have thought. But where do they disappear? Why does only a fragment of those ideas ever see the light of the world? <br/><br/>
        It’s an unfortunate reality of the society that we aren’t encouraged to pursue the ideas and interests that complete us. We are always missing out on the beautiful ideas that fill our head because either we fear defying the stereotype built in our society, or we don’t have the resources, or we don’t have any experiences. Imagine what our world could look like if all these ideas innovate themselves into reality? Imagine how exhilarating our lives would be if we could keep pursuing an idea—about something we like—that genuinely blazes our heart and soul? <br/><br/>
        If only there were others who thought like us, enjoy things like us, and share interests similar to us. Wait, but there are! Random people keep popping up everywhere and say exact things that directly correlate to our thoughts. And this is the incentive of our small initiative. We are a platform which aims to provide you an opportunity to meet like-minded, interesting people around you and connect with them based on the interesting things that cook in both of your heads. Those people would be the ones you can regularly meet and work with. People with whom you can learn and share valuable experiences. People with whom you can garnish enough strength to strive forward towards a common goal. Because we believe that every interest matters. Every idea matters. Each curiosity should deserve an opportunity. Because they a re ours, and they are priceless.
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
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sint rem amet ad, ex enim natus velit provident, voluptatibus, iusto beatae tempore necessitatibus eum minima voluptates recusandae assumenda modi corrupti incidunt iure veritatis. Fugit odio in totam facere, non quidem veniam.</p>
      </div>
    </div>
  </motion.div>
  );
}  


