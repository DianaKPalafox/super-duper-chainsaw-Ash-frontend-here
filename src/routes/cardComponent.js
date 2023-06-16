import Card from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from 'axios';
import React from "react";


const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const CardComponent = ({

  firstName,
  lastName,
  infosysEmail,
  employeeID,
  summary,
  resumeId, 
  blobUrl,
}) => {
  const [expanded, setExpanded] = React.useState(false);


  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleResumeDownload = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/user/getResume/${resumeId}`,
        {
          responseType: 'blob', 
        }
       );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'resume.pdf'); 
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading resume:', error);
    }




};


const styles = {
    media: {
      height: '500px',
   
    }
};



  return (
 
    <Card style={{ width: 'auto', height: 'auto' }}>
      <CardHeader title={`${firstName} ${lastName}`} />
      <CardMedia component="img"  alt="image"  src={blobUrl} style={styles.media
} />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          <b>Infosys Email:</b> {infosysEmail}
          <br />
          <b>Employee ID:</b> {employeeID}
          <br />
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>
            <b>Summary:</b> {summary}
          </Typography>
          <IconButton
            aria-label="Download Resume"
            onClick={handleResumeDownload}
          >
            Download Resume
          </IconButton>
        </CardContent>
      </Collapse>
      </Card>
  
  );
};

export default CardComponent;