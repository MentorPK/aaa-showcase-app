import { Box, Divider, Grid, List, ListItem, ListItemButton, Skeleton, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import { ClubProps } from "../../types/fbClubTypes";
import { Fragment, ReactNode } from "react";
import { tHtml } from "../../i18n/util";

type ClubListProps = {
    clubs: ClubProps[];
    error: String | null;
    isLoading: boolean;
};

type ImageWrapper = {
    children: ReactNode;
};
//this is neccessary because Arsenal FC had a different image size and it was off,
//to ensure that everything is centered, this wrapper does the job :)
//changing image size is also a solution
const ImageWrapper = ({ children }: ImageWrapper) => {
    return <div style={{ width: "64px", display: "flex", justifyContent: "center" }}>{children}</div>;
};

const SkeletonList = () => {
    const arr = Array.from({ length: 14 });
    return (
        <>
            <List>
                {arr.map((_, idx) => (
                    <Fragment key={idx}>
                        <ListItem disablePadding>
                            <Box sx={{ px: 2, py: 1 }}>
                                <Grid container direction={"row"} alignItems={"center"} gap={2}>
                                    <Grid item>
                                        <Skeleton animation="wave" variant="circular" height={64} width={64} />
                                    </Grid>
                                    <Grid item>
                                        <Skeleton width={400} />
                                        <Skeleton width={300} />
                                    </Grid>
                                </Grid>
                            </Box>
                        </ListItem>
                        <Divider component="li" />
                    </Fragment>
                ))}
            </List>
        </>
    );
};

type ErrorProps = {
    error: String | null;
};
const Error = ({ error }: ErrorProps) => {
    return (
        <Box height="500px" width="100%" display="flex" justifyContent="center" alignItems="center">
            <Typography variant="h5">{error}</Typography>
        </Box>
    );
};

const ClubList = ({ clubs, error, isLoading }: ClubListProps) => {
    if (isLoading) {
        return <SkeletonList />;
    }
    if (error) {
        return <Error error={error} />;
    }

    return (
        <List>
            {clubs.map((club: ClubProps, idx: number) => (
                <ListItem disablePadding key={idx}>
                    <ListItemButton divider component={NavLink} to={`/detailsview/${club.name.replace(/\s/g, "-")}`}>
                        <Grid container direction="row" alignItems={"center"} gap={2}>
                            <Grid item>
                                <ImageWrapper>
                                    <img src={`${club?.image}`} style={{ height: 64 }} />
                                </ImageWrapper>
                            </Grid>
                            <Grid item>
                                <Grid container direction="column">
                                    <Grid item>
                                        <Typography variant="subtitle1">
                                            <b>{`${club?.name}`}</b>
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="body2">
                                            {tHtml("fbList.text", {
                                                clubCountry: club?.country,
                                                clubValue: club?.value,
                                            })}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </ListItemButton>
                </ListItem>
            ))}
        </List>
    );
};

export default ClubList;
