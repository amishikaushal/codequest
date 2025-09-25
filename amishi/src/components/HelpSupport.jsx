import React from 'react';
import './HelpSupport.css';

const HelpSupport = () => {
  return (
    <div className="help-support-container">
      <h2>Help & Support</h2>
      
      <section className="faq-section">
        <h3>Frequently Asked Questions</h3>
        
        <div className="faq-item">
          <h4>How do I question content?</h4>
          <p>Click on any challenge to find relevant  links and articles. Our platform integrates directly with external platforms to provide comprehensive learning resources.</p>
        </div>

        <div className="faq-item">
          <h4>What is the A2Z DSA Course path?</h4>
          <p>The  DSA Course follows a structured learning path for coding challenges. Start with arrays and progress through advanced topics like dynamic programming and graphs.</p>
        </div>

        <div className="faq-item">
          <h4>How do I track my DSA progress?</h4>
          <p>Your progress is synchronized with TUF's sheet tracker. Complete problems on CodeQuest to automatically update your progress on both platforms.</p>
        </div>

        <div className="faq-item">
          <h4>Where can I find interview preparation resources?</h4>
          <p>Access our curated list of SDE Sheet problems, integrated with mentorship and  interview experiences and company-specific guides in the Challenges section.</p>
        </div>

        <div className="faq-item">
          <h4>How do I participate in weekly contests?</h4>
          <p>Join our weekly coding contests through the Challenges tab. These contests feature problems similar to popular platforms like LeetCode and CodeForces.</p>
        </div>

        <div className="faq-item">
          <h4>Can I discuss problems with other users?</h4>
          <p>Yes! Each problem has a discussion section where you can interact with other users, share approaches, and get help. You can also join our Discord community for real-time discussions.</p>
        </div>

        <div className="faq-item">
          <h4>How do I access the premium features?</h4>
          <p>Premium members get access to exclusive TUF content, mock interviews, mentor support, and premium contest problems. Visit your profile to upgrade.</p>
        </div>
      </section>

      <section className="contact-section">
        <h3>Contact Us</h3>
        <p>Need help? Reach out through:</p>
        <ul>
          <li>📧 Email: support@codequest.com</li>
          <li>💬 Discord: discord.gg/codequest-community</li>
          <li>⏰ Support Hours: 24/7 Community Support</li>
          <li>🔗 CodeQuest Forum: codequest.org/forum</li>
        </ul>
      </section>
    </div>
  );
};

export default HelpSupport;