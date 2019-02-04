import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import TimerIcon from '@material-ui/icons/Timer';
import DateRangeIcon from '@material-ui/icons/DateRange';

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired,
};

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: '100%',
  },
  card: {
    maxWidth: '100%',
    marginBottom: '3%'
  },
  media: {
    objectFit: 'fill',
  },
});

class Events extends React.Component {
  state = {
    value: 0,
    upcomingEvents: [],
    pastEvents: []
  };

  componentWillMount() {
     axios.get('/api/upcomingEvents/')
     .then(json=> {
       this.setState({upcomingEvents: json.data});
       console.log(this.state.upcomingEvents);
     });
    axios.get('/api/pastEvents/')
    .then(json=> {
      this.setState({pastEvents: json.data});
      console.log(this.state.pastEvents);
    });
  }
  
  EventsData = (classes, typeOfEvent) => {
     
     let eventsData = typeOfEvent == 'upcomingEvents' ?  this.state.upcomingEvents : this.state.pastEvents;
     console.log(eventsData);
     if(eventsData.length == 0 ) {
       return (<h1>No Data Found</h1>)
     }     
     return eventsData.map((data, index) => {
       var startDate = new Date(data.startTime), endDate = new Date(data.endTime);
      return (<Card className={classes.card} key={index}>
        <CardActionArea>
          <CardMedia
            component="img"
            alt="Event Logo"
            className={classes.media}
            height="300"
            image={data.image}
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom component="h2">
              {data.name}
            </Typography>
            <Typography component="p">
              {data.description}
            </Typography>
            <Typography >
              <TimerIcon style={{verticalAlign: 'middle'}} /> {startDate.toLocaleTimeString()} - {endDate.toLocaleTimeString()}
              <br />
              <DateRangeIcon style={{verticalAlign: 'middle'}}/> {startDate.toDateString()}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>);
     });
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  render() {
    const { classes, theme } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab style={{minWidth: '50%'}}
             label={ window.innerWidth>300 ?
              "Upcoming Events" :
               null}
               icon={ window.innerWidth<300 ? <ArrowUpwardIcon /> : null} 
               />
            <Tab style={{minWidth: '50%'}}
              label={ window.innerWidth>300 ?
              "Past Events" :
               null} 
              icon={ window.innerWidth<300 ? <ArrowDownwardIcon /> : null} 
               />

          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={this.state.value}
          onChangeIndex={this.handleChangeIndex}
        >
          <TabContainer dir={theme.direction}>
          {this.EventsData(classes, 'upcomingEvents')}
          </TabContainer>
          <TabContainer dir={theme.direction}>
          {this.EventsData(classes, 'pastEvents')}
          </TabContainer>
        </SwipeableViews>
      </div>
    );
  }
}

Events.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Events)