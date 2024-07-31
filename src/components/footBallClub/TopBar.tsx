import { AppBar, IconButton, Skeleton, Toolbar, Typography } from "@mui/material";
import { ReactNode } from "react";

type TopBarProps = {
    handleClick: () => void;
    text: string | undefined;
    icon: ReactNode;
    actionLeft?: boolean;
};

const TopBar = ({ handleClick, text, icon, actionLeft = false }: TopBarProps) => {
    const textSkeleton = <Skeleton width={200} height={40} />;

    return (
        <AppBar position="sticky" sx={{ color: "white" }}>
            <Toolbar
                sx={{
                    display: "flex",
                    flexDirection: !actionLeft ? "row" : "row-reverse",
                    justifyContent: actionLeft ? "flex-end" : "space-between",
                }}
            >
                {text ? <Typography variant="h6">{text}</Typography> : textSkeleton}
                <IconButton size="large" edge="start" color="inherit" aria-label="menu" onClick={handleClick}>
                    {icon}
                </IconButton>
            </Toolbar>
        </AppBar>
    );
};

export default TopBar;
