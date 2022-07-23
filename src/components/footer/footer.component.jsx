import logoGreen from "../../images/logo-green.png";

const Footer = () => {
  return (
    <div className="footer">
      <img className="footer__logo" alt="footerLogo" src={logoGreen} />
      <div className="footer__list">
        {/* <div className="footer__item">About us</div>
        <div className="footer__item">About us</div> */}
      </div>
    </div>
  );
};

export default Footer;
