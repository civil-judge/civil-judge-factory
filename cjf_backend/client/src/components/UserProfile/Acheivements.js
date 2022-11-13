import React from "react";
import { Grid, makeStyles, Paper, Avatar } from "@material-ui/core";
import Realistic from "./Celebrations";

const useStyles = makeStyles((theme) => ({
  paper2: {
    flexGrow: 1,
    padding: theme.spacing(2),
    flexDirection: "column",
    "& $h3": {
      marginTop: 0,
      color: "#2a5884",
      padding: 0,
      animation: "fadeInDown 0.45s both",
    },
  },
  awardGrid: {
    backgroundColor: "#2e89a950",
    borderRadius: "0.5rem",
    padding: "1rem",
    display: "flex",
    justifyContent: "space-between",
  },
  medalContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  medalText: {
    color: "#000",
    fontSize: "0.8rem",
    fontWeight: 700,
    textAlign: "center",
  },
  reqBox: {
    borderRadius: 8,
    marginTop: "0.4rem",
    backgroundColor: "#2e89a9",
    padding: "0.5rem",
    width: "6rem",
    textAlign: "center",
    fontSize: "0.8rem",
    fontWeight: 500,
    color: "#fff",
    boxShadow: "0px 0px 40px rgba(0, 0, 0, 0.2)",
  },
  lockStyle: {
    position: "absolute",
    transform: "translate(30px,30px)",
    width: "2rem",
    zIndex: 1,
    opacity: 0.9,
  },
  leaderBoard: {
    borderRadius: "0.5rem",
    padding: "1rem",
    backgroundColor: "#5e98c230",
  },
  avatar: {
    backgroundColor: "#2e89a9",
  },
  nameContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    margin: "0.3rem 0",
  },
  name: {
    padding: "0 1rem",
    fontWeight: 600,
  },
}));

export const Acheivements = (props) => {
  const classes = useStyles();

  return (
    <Grid container>
      {true ? <Realistic /> : null}
      <Grid item md={8} xs={12}>
        <Paper elevation={0} className={classes.paper2}>
          <h3>Achievements</h3>
          <Grid container spacing={1} className={classes.awardGrid}>
            <Grid
              item
              container
              xs={12}
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <Grid item sm={2} xs={12} className={classes.medalContainer}>
                <div
                  style={{
                    width: "6rem",
                  }}
                >
                  <img
                    src="/images/bronzeTrophy.png"
                    alt="Bronze Trophy"
                    style={{
                      width: "100%",
                      filter:
                        "drop-shadow(0 0 6px #fff) drop-shadow(0 0 10px #ff900050) drop-shadow(0 0 14px #FFFF00)",
                    }}
                  />
                </div>
                <div className={classes.medalText}>Bronze</div>
                <div className={classes.reqBox}>5 Mocks</div>
              </Grid>
              <Grid item sm={2} xs={12} className={classes.medalContainer}>
                <div
                  style={{
                    width: "6rem",
                  }}
                >
                  <img
                    src="/images/silverTrophy.png"
                    alt="Silver Trophy"
                    style={{
                      width: "100%",
                      filter:
                        "drop-shadow(0 0 6px #fff) drop-shadow(0 0 10px #ff900050) drop-shadow(0 0 14px #FFFF00)",
                    }}
                  />
                </div>
                <div className={classes.medalText}>Silver</div>
                <div className={classes.reqBox}>20 Mocks</div>
              </Grid>
              <Grid item sm={2} xs={12} className={classes.medalContainer}>
                <div
                  style={{
                    width: "6rem",
                  }}
                >
                  <img
                    src="/images/lock.png"
                    alt="Lock"
                    className={classes.lockStyle}
                  />
                  <img
                    src="/images/goldTrophy.png"
                    alt="Gold Trophy"
                    style={{ width: "100%" }}
                  />
                </div>
                <div className={classes.medalText}>Gold</div>
                <div className={classes.reqBox}>50 Mocks</div>
              </Grid>
              <Grid item sm={2} xs={12} className={classes.medalContainer}>
                <div
                  style={{
                    width: "6rem",
                  }}
                >
                  <img
                    src="/images/lock.png"
                    alt="Lock"
                    className={classes.lockStyle}
                  />
                  <img
                    src="/images/platinumTrophy.png"
                    alt="Platinum Trophy"
                    style={{ width: "100%" }}
                  />
                </div>
                <div className={classes.medalText}>Platinum</div>
                <div className={classes.reqBox}>100 Mocks</div>
              </Grid>
              <Grid item sm={2} xs={12} className={classes.medalContainer}>
                <div
                  style={{
                    width: "6rem",
                  }}
                >
                  <img
                    src="/images/lock.png"
                    alt="Lock"
                    className={classes.lockStyle}
                  />
                  <img
                    src="/images/diamondTrophy.png"
                    alt="Diamond Trophy"
                    style={{ width: "100%" }}
                  />
                </div>
                <div className={classes.medalText}>Diamond</div>
                <div className={classes.reqBox}>250 Mocks</div>
              </Grid>
            </Grid>
            <Grid
              item
              container
              xs={12}
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "1rem",
              }}
            >
              <Grid item sm={2} xs={12} className={classes.medalContainer}>
                <div
                  style={{
                    width: "6rem",
                  }}
                >
                  <img
                    src="/images/bronzeStar.png"
                    alt="Bronze Star"
                    style={{
                      width: "100%",
                      filter:
                        "drop-shadow(0 0 6px #fff) drop-shadow(0 0 10px #ff900050) drop-shadow(0 0 14px #FFFF00)",
                    }}
                  />
                </div>
                <div className={classes.medalText}>Bronze</div>
                <div className={classes.reqBox}>30 min.</div>
              </Grid>
              <Grid item sm={2} xs={12} className={classes.medalContainer}>
                <div
                  style={{
                    width: "6rem",
                  }}
                >
                  <img
                    src="/images/lock.png"
                    alt="Lock"
                    className={classes.lockStyle}
                  />
                  <img
                    src="/images/silverStar.png"
                    alt="Silver Star"
                    style={{ width: "100%" }}
                  />
                </div>
                <div className={classes.medalText}>Silver</div>
                <div className={classes.reqBox}>100 min.</div>
              </Grid>
              <Grid item sm={2} xs={12} className={classes.medalContainer}>
                <div
                  style={{
                    width: "6rem",
                  }}
                >
                  <img
                    src="/images/lock.png"
                    alt="Lock"
                    className={classes.lockStyle}
                  />
                  <img
                    src="/images/GoldStar.png"
                    alt="Gold Star"
                    style={{ width: "100%" }}
                  />
                </div>
                <div className={classes.medalText}>Gold</div>
                <div className={classes.reqBox}>500 min.</div>
              </Grid>
              <Grid item sm={2} xs={12} className={classes.medalContainer}>
                <div
                  style={{
                    width: "6rem",
                  }}
                >
                  <img
                    src="/images/lock.png"
                    alt="Lock"
                    className={classes.lockStyle}
                  />
                  <img
                    src="/images/PlatinumStar.png"
                    alt="Platinum Star"
                    style={{ width: "100%" }}
                  />
                </div>
                <div className={classes.medalText}>Platinum</div>
                <div className={classes.reqBox}>1000 min.</div>
              </Grid>
              <Grid item sm={2} xs={12} className={classes.medalContainer}>
                <div
                  style={{
                    width: "6rem",
                  }}
                >
                  <img
                    src="/images/lock.png"
                    alt="Lock"
                    className={classes.lockStyle}
                  />
                  <img
                    src="/images/DiamondStar.png"
                    alt="Diamond Star"
                    style={{ width: "100%" }}
                  />
                </div>
                <div className={classes.medalText}>Diamond</div>
                <div className={classes.reqBox}>5000 min.</div>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <Grid item md={4} xs={12}>
        <Paper elevation={0} className={classes.paper2}>
          <h3>Leaderboard</h3>
          <Grid container spacing={1} className={classes.leaderBoard}>
            {
              // eslint-disable-next-line array-callback-return
              [1, 2, 3, 4, 5].map((item, index) => {
                return (
                  <Grid
                    item
                    xs={12}
                    justify="space-between"
                    alignItems="center"
                    container
                  >
                    <div className={classes.nameContainer}>
                      <Avatar
                        src={`https://avatars.dicebear.com/api/human/${
                          index + 1
                        }.svg`}
                        className={classes.avatar}
                      >
                        H
                      </Avatar>
                      <span className={classes.name}>John Doe</span>
                    </div>
                    <div>{item}</div>
                  </Grid>
                );
              })
            }
            <hr />
            <Grid
              item
              xs={12}
              justify="space-between"
              alignItems="center"
              container
              style={{
                borderTop: "1px solid #999",
              }}
            >
              <div className={classes.nameContainer}>
                <Avatar
                  className={classes.avatar}
                  src={`https://avatars.dicebear.com/api/human/${6}.svg`}
                >
                  N
                </Avatar>
                <span className={classes.name}>Nitin Verma</span>
              </div>
              <div>{23}</div>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};
