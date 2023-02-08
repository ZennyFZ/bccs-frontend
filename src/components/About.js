export default function About() {
  return (
    <div>
      <img style={{width: "1536px", height: "480px"}} src="https://images.immediate.co.uk/production/volatile/sites/22/2017/07/Puffins-on-skomer-Island-c9fabf1-scaled.jpg" />
      <div class="AboutContainer">
        <div class="AboutContentContainer">
          <h3 class="AboutTitle">Bird Care Consulting</h3>
          <p class="AboutDescription">Founded in 1995, our extensive knowledge and experience have allowed us to provide services, a broad product range that is used and trusted by many bird keepers around the world.</p>
        </div>
      </div>
      <div>
        <h3 class="AboutTitle">Our Vision</h3>
        <p class="AboutDescription">Our vision is to provide the best possible service to our customers, and to provide the best possible products to our customers.</p>
      </div>
      <div className='AboutBox'>
        <div className="AboutBoxItem">
          <h5>Our Goat</h5>
          <p>Arknights: Prelude to Dawn</p>
        </div>
        <div className="AboutBoxItem">
          <h5>Our Positioning</h5>
          <p>From Commonplace to World's Strongest </p>
        </div>
      </div>
    </div>
  );
}