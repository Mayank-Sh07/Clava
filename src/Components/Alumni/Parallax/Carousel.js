import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import ParallaxSlide from "./ParallaxSlide";
import arrowButtonStyles from "./arrowButtonStyles";
import { ProfileIcon } from "../../Icons";

const useStyles = makeStyles(({ palette, breakpoints, spacing }) => ({
  root: {
    // a must if you want to set arrows, indicator as absolute
    position: "relative",
    width: "100%",
  },
  slide: {
    perspective: 1000, // create perspective
    overflow: "hidden",
    // relative is a must if you want to create overlapping layers in children
    position: "relative",
    paddingTop: spacing(8),
    [breakpoints.up("sm")]: {
      paddingTop: spacing(10),
    },
    [breakpoints.up("md")]: {
      paddingTop: spacing(14),
    },
  },
  imageContainer: {
    display: "block",
    position: "relative",
    zIndex: 2,
    paddingBottom: "56.25%",
  },
  image: {
    display: "block",
    position: "absolute",
    zIndex: 10,
    width: "70%",
    height: "70%",
    right: 0,
    bottom: 0,
    objectFit: "cover",
    marginLeft: "12%",
    [breakpoints.up("sm")]: {
      marginLeft: "4%",
    },
  },
  arrow: {
    display: "none",
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    backgroundColor: "#E1E1E1",
    [breakpoints.up("sm")]: {
      display: "inline-flex",
    },
  },
  arrowLeft: {
    left: 0,
    [breakpoints.up("lg")]: {
      left: -64,
    },
  },
  arrowRight: {
    right: 0,
    [breakpoints.up("lg")]: {
      right: -64,
    },
  },
  text: {
    // shared style for text-top and text-bottom
    fontFamily: "Poppins, san-serif",
    fontWeight: 400,
    borderRadius: 8,
    position: "absolute",
    color: palette.common.white,
    padding: "8px",
    transform: "rotateY(45deg)",
    lineHeight: 1.2,
    [breakpoints.up("sm")]: {
      padding: "8px 16px",
    },
    [breakpoints.up("md")]: {
      padding: "16px 24px",
    },
  },
  title: {
    top: 20,
    left: "20%",
    height: "40%",
    zIndex: 1,
    background: "linear-gradient(0deg, rgba(255,255,255,0) 0%, #070E38 100%)",
    [breakpoints.up("sm")]: {
      top: 40,
    },
    [breakpoints.up("md")]: {
      top: 52,
    },
  },
  subtitle: {
    top: 60,
    left: "0%",
    height: "52%",
    zIndex: 2,
    background: "linear-gradient(0deg, rgba(255,255,255,0) 0%, #070E38 100%)",
    [breakpoints.up("sm")]: {
      top: 112,
      left: "6%",
    },
    [breakpoints.up("md")]: {
      top: 128,
    },
  },
  indicatorContainer: {
    textAlign: "center",
  },
}));

const useArrowDarkButtonStyles = makeStyles(arrowButtonStyles, {
  name: "ArrowDarkButton",
});

const ParallaxCarousel = () => {
  const classes = useStyles();
  const arrowStyles = useArrowDarkButtonStyles();
  const createStyle = (slideIndex, fineIndex) => {
    const diff = slideIndex - fineIndex;
    if (Math.abs(diff) > 1) return {};
    return {
      transform: `rotateY(${(-diff + 1) * 45}deg)`,
    };
  };

  const data = [
    {
      id: 1,
      title: "SAFE?",
      subtitle:
        "Secured by Google Authentication, Expaflow ensures that your data is safe and secure!",
      image: <ProfileIcon color='primary' className={classes.image} />,
    },
    {
      id: 2,
      title: "FAST?",
      subtitle:
        "Running an optimized 'shortest path cash flow' algorithm under the hood, It's guaranteed to be FAST!",
      image: <ProfileIcon color='primary' className={classes.image} />,
    },
    {
      id: 3,
      title: "GOOD?",
      subtitle:
        "A fully Responsive mobile-first web application which supports devices with various screen sizes!",
      image: <ProfileIcon color='primary' className={classes.image} />,
    },
  ];

  // eslint-disable-next-line react/prop-types
  const renderElements = ({ index, onChangeIndex }) => (
    <>
      <Button
        className={clsx(classes.arrow, classes.arrowLeft)}
        classes={arrowStyles}
        disabled={index === 0}
        onClick={() => onChangeIndex(index - 1)}
      >
        <KeyboardArrowLeft />
      </Button>
      <Button
        className={clsx(classes.arrow, classes.arrowRight)}
        classes={arrowStyles}
        disabled={index === data.length - 1}
        onClick={() => onChangeIndex(index + 1)}
      >
        <KeyboardArrowRight />
      </Button>
    </>
  );
  const renderChildren = ({ injectStyle, fineIndex }) =>
    data.map(({ id, title, subtitle, image }, i) => (
      <div key={id} className={classes.slide}>
        <Typography
          noWrap
          className={clsx(classes.text, classes.title)}
          variant='h3'
          style={{ ...injectStyle(i, 60), ...createStyle(i, fineIndex) }}
        >
          {title}
        </Typography>
        <Typography
          className={clsx(classes.text, classes.subtitle)}
          variant='h6'
          align='center'
          style={{
            ...injectStyle(i, 40),
            ...createStyle(i, fineIndex),
            maxWidth: "500px",
          }}
        >
          {subtitle}
        </Typography>
        <div className={classes.imageContainer}>{image}</div>
      </div>
    ));
  return (
    <div className={classes.root}>
      <ParallaxSlide renderElements={renderElements}>
        {renderChildren}
      </ParallaxSlide>
    </div>
  );
};

export default ParallaxCarousel;
