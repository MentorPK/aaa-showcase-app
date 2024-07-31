import { useParams, useNavigate } from "react-router-dom";
import { useStore } from "zustand";
import { Box, CircularProgress, Grid, Skeleton, Typography } from "@mui/material";
import ArrowBack from "@mui/icons-material/ArrowBack";
import footBallClubStore from "../../stores/footBallClubStore";
import { ClubProps } from "../../types/fbClubTypes";
import { useEffect } from "react";
import { tHtml } from "../../i18n/util";
import TopBar from "./TopBar";

const SkeletonLoader = () => {
    return (
        <>
            <Skeleton width={"100%"} />
            <Skeleton width={"50%"} />
        </>
    );
};

type ClubComponentProps = {
    club: ClubProps | undefined;
    isLoading: boolean;
    error: String | null;
};

const ClubBody = ({ club, isLoading }: ClubComponentProps) => {
    return (
        <Box mt={2} mx={2}>
            <Grid container direction="column" gap={2}>
                <Grid item>
                    {!isLoading ? (
                        <Typography>
                            {tHtml("fbDetails.value", { clubName: club?.name, clubValue: club?.value })}
                        </Typography>
                    ) : (
                        <SkeletonLoader />
                    )}
                </Grid>
                <Grid item>
                    {!isLoading ? (
                        <Typography>
                            {tHtml("fbDetails.wins", { clubName: club?.name, clubWins: club?.european_titles })}
                        </Typography>
                    ) : (
                        <SkeletonLoader />
                    )}
                </Grid>
            </Grid>
        </Box>
    );
};

const ClubBanner = ({ club, isLoading, error }: ClubComponentProps) => {
    const background = "#333333";
    const spinner = (
        <Box height={320} width={320} display={"flex"} alignItems={"center"}>
            <CircularProgress color="primary" size={160} />
        </Box>
    );

    return (
        <Box sx={{ background }} p={2}>
            {!error ? (
                <>
                    <Grid container justifyContent={"center"} flexDirection={"row"}>
                        <Grid item>{!isLoading ? <img src={club?.image} style={{ height: "320px" }} /> : spinner}</Grid>
                    </Grid>
                    <Typography variant="h4" color="white">
                        {!isLoading && club?.name}
                    </Typography>
                </>
            ) : (
                <Box sx={{ height: 420, display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <Typography variant="h4" color="white">
                        {error}
                    </Typography>
                </Box>
            )}
        </Box>
    );
};

const FootBallClubDetailsSite = () => {
    const params = useParams();
    const { clubs, fetchClubs, isLoading, error } = useStore(footBallClubStore);
    const navigate = useNavigate();
    const clubName = params.details?.replace(/-/g, " ");
    const club = clubs.find((item: ClubProps) => item?.name === clubName);
    const navigateBack = () => {
        navigate("/");
    };

    useEffect(() => {
        fetchClubs();
    }, []);

    return (
        <>
            <TopBar icon={<ArrowBack />} text={club?.name} handleClick={navigateBack} actionLeft />
            <ClubBanner club={club} isLoading={isLoading} error={error} />
            <ClubBody club={club} isLoading={isLoading} error={error} />
        </>
    );
};

export default FootBallClubDetailsSite;
