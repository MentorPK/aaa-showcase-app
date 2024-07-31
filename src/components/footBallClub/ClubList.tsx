import { Box, Divider, Grid, List, ListItem, ListItemButton, ListItemText, Skeleton } from "@mui/material";
import { NavLink } from "react-router-dom";
import { ClubProps } from "../../types/fbClubTypes";
import { Fragment, ReactNode } from "react";

type ClubListProps = {
    clubs: ClubProps[];
    error: String | null;
};

type ImageWrapper = {
    children: ReactNode;
};
//this is neccessary because Arsenal FC had a different image size and it was off,
//to ensure that everything is centered, this wrapper does the job :)
//ask for a new image size from the designer would be also a solution
const ImageWrapper = ({ children }: ImageWrapper) => {
    return <div style={{ width: "64px", display: "flex", justifyContent: "center" }}>{children}</div>;
};

const Placeholder = () => {
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
                                        <Skeleton width={400} />
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
            {error}
        </Box>
    );
};

const ClubList = ({ clubs, error }: ClubListProps) => {
    console.log(clubs, "WAT")
    if (clubs.length < 1) {
        console.log("HALLO")
        return <Placeholder />;
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
                                        <ListItemText primary={`${club?.name}`} />
                                        <Grid container wrap="nowrap" spacing={1}>
                                            <Grid item>
                                                <ListItemText secondary={`${club?.country}`} />
                                            </Grid>
                                            <Grid item>
                                                <ListItemText secondary={`${club?.value} Millionen Euro`} />
                                            </Grid>
                                        </Grid>
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
