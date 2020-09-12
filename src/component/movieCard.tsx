import React, { Dispatch } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { MovieActions } from '../redux/actions/movieActions';
import { MovieElem } from "../utils/interfaces";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import LinearProgress from '@material-ui/core/LinearProgress';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';

const useStyles = makeStyles({
  root: {
    minWidth: 250,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  actionText: {
    marginLeft: 0,
    marginRight: 20
  },
  pos: {
    marginBottom: 12,
  },
});

interface MovieWrapped {
  movie: MovieElem;
  id: number
}

export default function MovieCard(Props: MovieWrapped) {
  const classes = useStyles();
  const movieDispatch = useDispatch<Dispatch<MovieActions>>();
  const progress = (Props.movie.likes * 100) / (Props.movie.likes + Props.movie.dislikes);

  const handleDelete = () => {
    movieDispatch({ type: 'DELETE_MOVIE', itemId: Props.movie.id })
  }

  const likeMovie = () => {
    if (Props.movie.disliked) {
      movieDispatch({ type: 'DISLIKE_MOVIE', itemId: Props.id })
    }
    movieDispatch({ type: 'LIKE_MOVIE', itemId: Props.id })
  }

  const dislikeMovie = () => {
    if (Props.movie.liked) {
      movieDispatch({ type: 'LIKE_MOVIE', itemId: Props.id })
    }
    movieDispatch({ type: 'DISLIKE_MOVIE', itemId: Props.id })
  }

  return (
    <Card className={classes.root}>
      <CardContent>
        <CardHeader
          action={
            <IconButton aria-label="delete" onClick={() => handleDelete()}>
              <DeleteIcon />
            </IconButton>
          }
          titleTypographyProps={{ variant: 'h6' }}
          title={Props.movie.title}
        />
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          {Props.movie.category}
        </Typography>
        <LinearProgress variant="determinate" value={progress} />

      </CardContent>
      <CardActions>
        <IconButton onClick={() => likeMovie()}>
          <ThumbUpIcon color={(Props.movie.liked) ? "primary" : "inherit"}/>
        </IconButton>
        <Typography className={classes.actionText} color="textSecondary" gutterBottom>
          {Props.movie.likes}
        </Typography>
        <IconButton onClick={() => dislikeMovie()}>
          <ThumbDownIcon color={(Props.movie.disliked) ? "secondary" : "inherit"}/>
        </IconButton>
        <Typography className={classes.actionText} color="textSecondary" gutterBottom>
          {Props.movie.dislikes}
        </Typography>
      </CardActions>
    </Card>
  );
}