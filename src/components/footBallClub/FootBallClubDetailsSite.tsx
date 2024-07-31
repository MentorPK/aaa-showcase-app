import { NavLink, useParams } from "react-router-dom";
import { useStore } from "zustand";
import { AppBar, Box, Grid, IconButton, styled, Toolbar, Typography } from "@mui/material";
import ArrowBack from "@mui/icons-material/ArrowBack";
import footBallClubStore from "../../stores/footBallClubStore";
import { ClubProps } from "../../types/fbClubTypes";
import { useEffect } from "react";

const BoldSpan = styled("span")({
    display: "inline-block",
    fontWeight: "bold",
});

type ClubComponentProps = {
    club: ClubProps | undefined;
};

const ClubBody = ({ club }: ClubComponentProps) => {
    if (!club) {
        return (
            <Box m={8} display="flex" justifyContent="center">
                <Typography variant="h4">Sorry Club Details are not available :(!</Typography>
            </Box>
        );
    }

    return (
        <Box mt={2} ml={2}>
            <Grid container direction="column" gap={4}>
                <Grid item>
                    <Typography>
                        Der Club <BoldSpan>{club?.name}</BoldSpan> aus {club?.country} hat ein Wert von {club?.value}.
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography>
                        <BoldSpan>{club?.name}</BoldSpan> konnte bislang {club?.european_titles} Siege auf europäischer
                        Ebene erreichgen.
                    </Typography>
                </Grid>
            </Grid>
        </Box>
    );
};

const ClubBanner = ({ club }: ClubComponentProps) => {
    const background = "#333333";
    return (
        <Box sx={{ background }} p={4}>
            {club ? (
                <>
                    <Grid container justifyContent={"center"} flexDirection={"row"}>
                        <Grid item>
                            <img src={club?.image} style={{ height: "360px" }} />
                        </Grid>
                    </Grid>
                    <Typography variant="h4" color="white">
                        {club?.name}
                    </Typography>
                </>
            ) : (
                <Box sx={{ height: 420, display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <Typography variant="h4" color="white">
                        Sorry Club Details are not available :(!
                    </Typography>
                </Box>
            )}
        </Box>
    );
};

const FootBallClubDetailsSite = () => {
    const params = useParams();
    const { clubs, fetchClubs } = useStore(footBallClubStore);
    const clubName = params.details?.replace(/-/g, " ");
    const club = clubs.find((item: ClubProps) => item?.name === clubName);

    useEffect(() => {
        fetchClubs();
    }, []);

    return (
        <>
            <AppBar position="sticky" sx={{ color: "white" }}>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        component={NavLink}
                        to={"/"}
                    >
                        <ArrowBack />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        {club?.name}
                    </Typography>
                </Toolbar>
            </AppBar>
            <ClubBanner club={club} />
            <ClubBody club={club} />
        </>
    );
};

export default FootBallClubDetailsSite;
