import * as React from "react";
import {animated, useSpring} from "react-spring";

const INITIAL_SCALE = 0.97;
const HOVER_SCALE = 0.99;

const SpringZoom = (props: {children: React.ReactNode}) => {
    const [style, set] = useSpring(() => ({
        scale: INITIAL_SCALE,
        config: { mass: 3, tension: 500, friction: 60 },
    }));

    const onMouseEnter = () => set({scale: HOVER_SCALE});
    const onMouseLeave = () => set({scale: INITIAL_SCALE});

    return <animated.div style={{...style}}
                         onMouseEnter={onMouseEnter}
                         onMouseLeave={onMouseLeave}>
        {props.children}
    </animated.div>
};

export default SpringZoom;