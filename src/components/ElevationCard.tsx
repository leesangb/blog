import * as React from "react";
import {Card} from "@material-ui/core";

interface ElevationCardProps {
    style?: React.CSSProperties;
    children: React.ReactNode;
    onClick?: () => void;
}

const ElevationCard = (props: ElevationCardProps) => {
    const [raise, setRaise] = React.useState(0);

    const { style } = props;
    const styleProps = { style };

    const onMouseOver = () => {
        setRaise(8);
    };

    const onMouseOut = () => {
        setRaise(0);
    };

    return <div {...styleProps}>
        <Card onClick={props.onClick}
              style={{...style}}
              elevation={raise}
              onMouseOver={onMouseOver}
              onMouseOut={onMouseOut}>
            {props.children}
        </Card>
    </div>
};

export default ElevationCard;
