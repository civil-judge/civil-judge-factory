import React, { useEffect } from "react";
import TelegramIcon from "@material-ui/icons/Telegram";
import "./Footer.css";

import { Link, useLocation } from "react-router-dom";
import { getData } from "../../helpers/FetchApi";
import { Container, Grid } from "@material-ui/core";

export const Footer = () => {
  const { pathname } = useLocation();

  const [address, setAddress] = React.useState("");
  const [phoneno, setPhoneno] = React.useState("");
  const [mail, setMail] = React.useState("");

  const fetchSettings = async () => {
    var result = await getData("web/getSettings");
    if (result.success) {
      setAddress(result.data[0].address);
      setPhoneno(result.data[0].phoneno);
      setMail(result.data[0].mail);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  if (
    pathname == "/admin" ||
    pathname == "/dashboard" ||
    pathname == "/mocktest" ||
    pathname == "/comingsoon"
  )
    return null;

  return (
    <footer
      className="footer-section"
      style={{
        marginTop:
          (pathname.includes("course-content") ||
            pathname.includes("profile")) &&
          0,
      }}
    >
      <Container
        style={{
          paddingInline: 80,
        }}
      >
        <div
          className="footer-cta"
          style={{
            paddingTop: "1rem",
            paddingBottom: "1rem",
          }}
        >
          <Grid
            container
            spacing={3}
            style={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <Grid
              item
              xl={4}
              md={4}
              style={{
                marginBottom: "1rem",
              }}
            >
              <div className="single-cta">
                <i className="fa fa-map-marker"></i>
                <div className="cta-text">
                  <h4>Find us</h4>
                  <span>{address}</span>
                </div>
              </div>
            </Grid>
            <Grid
              item
              xl={4}
              md={4}
              style={{
                marginBottom: "1rem",
              }}
            >
              <div className="single-cta">
                <i className="fa fa-phone"></i>
                <div className="cta-text">
                  <h4>Call us</h4>
                  <span>{phoneno}</span>
                </div>
              </div>
            </Grid>
            <Grid
              item
              xl={4}
              md={4}
              style={{
                marginBottom: "1rem",
              }}
            >
              <div className="single-cta">
                <i className="fa fa-envelope-open"></i>
                <div className="cta-text">
                  <h4>Mail us</h4>
                  <a href={`mailto:${mail}`}>
                    <span>{mail}</span>
                  </a>
                </div>
              </div>
            </Grid>
          </Grid>
        </div>
        <div
          className="footer-content"
          style={{
            paddingTop: "2rem",
            paddingBottom: "1rem",
          }}
        >
          <Grid
            container
            spacing={3}
            style={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <Grid
              item
              xl={4}
              md={4}
              style={{
                marginBottom: "1rem",
              }}
            >
              <div className="footer-widget">
                <div className="footer-logo">
                  <a href="/">
                    <img
                      src="/images/02.png"
                      className="img-fluid"
                      alt="logo"
                      style={{ filter: "drop-shadow(1px 1px 0.5px #000)" }}
                    />
                  </a>
                </div>
                <div className="footer-text">
                  <p>
                    This platform has been created with an intention to provide
                    people from law field with a single destination to all there
                    needs. By taking our specialized courses we make sure that
                    the aspirants are now ready to take on anything.
                  </p>
                </div>
                <div className="footer-social-icon">
                  <span>Follow us</span>
                  <a
                    rel="noreferrer"
                    href="https://facebook.com/theciviljudgefactory"
                    target="_blank"
                  >
                    <i className="fa fa-facebook-f facebook-bg"></i>
                  </a>
                  <a
                    rel="noreferrer"
                    href="https://twitter.com/Team_CJF"
                    target="_blank"
                  >
                    <i className="fa fa-twitter twitter-bg"></i>
                  </a>
                  <a
                    rel="noreferrer"
                    href="https://instagram.com/the_civiljudge_factory/"
                    target="_blank"
                  >
                    <i className="fa fa-instagram google-bg"></i>
                  </a>
                </div>
              </div>
            </Grid>
            <Grid
              item
              xl={4}
              lg={4}
              md={6}
              style={{
                marginBottom: "1rem",
              }}
            >
              <div className="footer-widget">
                <div className="footer-widget-heading">
                  <h3>Useful Links</h3>
                </div>
                <ul>
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <Link to="/courses">Courses</Link>
                  </li>
                  <li>
                    <Link to="/studynotes">Study Notes</Link>
                  </li>
                  <li>
                    <Link to="/mocks">Mocks</Link>
                  </li>
                  <li>
                    <Link to="/blog">Blog</Link>
                  </li>
                  <li>
                    <Link to="/community/forum">Community/Forum</Link>
                  </li>
                  <li>
                    <Link to="/legalopportunities">Legal Opportunities</Link>
                  </li>
                  <li>
                    <Link to="/aboutus">About Us</Link>
                  </li>
                </ul>
              </div>
            </Grid>
            <Grid
              item
              xl={4}
              lg={4}
              md={6}
              style={{
                marginBottom: "1rem",
              }}
            >
              <div className="footer-widget">
                <div className="footer-widget-heading">
                  <h3>Subscribe</h3>
                </div>
                <div className="footer-text">
                  <p>
                    Don’t miss to subscribe to our new feeds, kindly fill the
                    form below.
                  </p>
                </div>
                <div className="subscribe-form">
                  <input type="text" placeholder="Email Address" />
                  <button>
                    <TelegramIcon />
                  </button>
                </div>
              </div>
            </Grid>
          </Grid>
        </div>
      </Container>
      <div className="copyright-area">
        <Container
          style={{
            paddingInline: 80,
          }}
        >
          <Grid container className="middle-text">
            <Grid item xl={6} lg={6}>
              <div className="copyright-text">
                <p>
                  Copyright &copy; {new Date().getFullYear()}, All Right
                  Reserved
                </p>
              </div>
            </Grid>
            <Grid item xl={6} lg={6}>
              <div className="footer-menu">
                <ul>
                  {/* eslint-disable-next-line */}
                  <li>
                    <>Home</>
                  </li>
                  {/* eslint-disable-next-line */}
                  <li>
                    <>Terms</>
                  </li>
                  {/* eslint-disable-next-line */}
                  <li>
                    <>Privacy</>
                  </li>
                  {/* eslint-disable-next-line */}
                  <li>
                    <>Policy</>
                  </li>
                  {/* eslint-disable-next-line */}
                  <li>
                    <>Contact</>
                  </li>
                </ul>
              </div>
            </Grid>
          </Grid>
        </Container>
      </div>
    </footer>
  );
};
