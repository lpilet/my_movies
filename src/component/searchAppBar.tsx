import React, { Dispatch } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../redux/reducers/rootReducer';
import { FiltersActions } from '../redux/actions/filtersActions';
import { CategoryElem } from "../utils/interfaces";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { createStyles, fade, Theme, makeStyles } from '@material-ui/core/styles';
import TuneIcon from '@material-ui/icons/Tune';
import SearchIcon from '@material-ui/icons/Search';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            marginBottom: theme.spacing(5)
        },
        tuneButton: {
            marginLeft: theme.spacing(5),
        },
        title: {
            display: 'none',
            marginRight: theme.spacing(5),
            [theme.breakpoints.up('sm')]: {
                display: 'block',
            },
        },
        search: {
            position: 'relative',
            flexGrow: 1,
            borderRadius: theme.shape.borderRadius,
            backgroundColor: fade(theme.palette.common.white, 0.15),
            '&:hover': {
                backgroundColor: fade(theme.palette.common.white, 0.25),
            },
            marginLeft: 0,
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                marginLeft: theme.spacing(1),
                width: 'auto',
            },
        },
        searchIcon: {
            padding: theme.spacing(0, 2),
            height: '100%',
            position: 'absolute',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        inputRoot: {
            color: 'inherit',
        },
        inputInput: {
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                width: '12ch',
                '&:focus': {
                    width: '20ch',
                },
            },
        },
    }),
);

export default function SearchAppBar() {
    const classes = useStyles();
    const { searchText, categories } = useSelector((state: AppState) => {
        return ({
            searchText: state.filter.searchText,
            categories: state.filter.categories,
        })
    });
    const filtersDispatch = useDispatch<Dispatch<FiltersActions>>();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSelect = (id: number) => {
        filtersDispatch({ type: 'SELECT_CATEGORY', itemId: id });
    };

    const changeSearchText = (e: React.ChangeEvent<HTMLInputElement>) => {
        filtersDispatch({ type: 'CHANGE_SEARCH_TEXT', value: e.currentTarget.value });
    }

    function ListMenuItems() {

        if (!categories || categories.length === 0) {
            return (<div />)
        }

        return (
            <div>
                {
                    categories.map((element: CategoryElem, i: number) => {
                        return (
                            <MenuItem onClick={() => handleSelect(i)}>
                                <Checkbox
                                    defaultChecked
                                    color="primary"
                                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                                />
                                <Typography>{element.name}</Typography>
                            </MenuItem>

                        )
                    })
                }
            </div>
        )
    }

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography className={classes.title} variant="h6" noWrap>
                        My Movies
                    </Typography>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="Search…"
                            value={searchText}
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => changeSearchText(e)}
                        />
                    </div>
                    <IconButton
                        edge="start"
                        className={classes.tuneButton}
                        color="inherit"
                        onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleClick(e)}
                    >
                        <TuneIcon />
                    </IconButton>
                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        {ListMenuItems()}
                    </Menu>
                </Toolbar>
            </AppBar>
        </div>
    );
}