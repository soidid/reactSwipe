/** @jsx React.DOM */

var React = require('react/addons');

/* ===== Components ======= */
var Cards = require('../Cards/Cards.jsx');
var NavIndicator = require('../NavIndicator/NavIndicator.jsx');

//

require('./App.css');

var App = React.createClass({

  getInitialState(){
    return {
       data: [0,1,2,3,4,5],
       currentIndex: 0,
       touchStartX: null,
       touchStartY: null,
       touchEndX: null,
       touchEndY: null,
       finalMoveX: null,
       max: 5 // MaxIndex = data.length-1
    }
  },

  componentWillMount(){
    React.initializeTouchEvents(true);
  },

  _onTouchStart(event){
    this.setState({
      touchStartX: event.touches[0].clientX,
      touchStartY: event.touches[0].clientY,
      finalMoveX: null
    });
  },

  _onTouchEnd(event){
    var state = this.state;
    var moveX = state.touchEndX - state.touchStartX;
    var moveY = state.touchEndY - state.touchStartY;
   
    currentIndex = state.currentIndex;

    //console.log("x:"+Math.abs(moveX)+", y:"+Math.abs(moveY));
    // 40 is threshold
    if(Math.abs(moveX) < 40 || Math.abs(moveY) > 50){
       return;

    }
    // Slide Direction
    if(moveX > 0){//toggle Prev
        currentIndex = currentIndex -1;
        if(currentIndex < 0)
           currentIndex = 0;
           //currentIndex = state.max;
    
    }else{//toggle Next
        currentIndex = currentIndex + 1;
        if(currentIndex > state.max)
           currentIndex = state.max;
           //currentIndex = currentIndex % (state.max+1);
       
    }
    
    this.setState({
      currentIndex: currentIndex,
      finalMoveX: moveX
    });
    
  },
  
  _onTouchMove(event){
    console.log("Move: ("+event.touches[0].clientX + "," + event.touches[0].clientY+")");
    this.setState({
      touchEndX: event.touches[0].clientX,
      touchEndY: event.touches[0].clientY
    });
  },

  _onSetIndex(value){
    this.setState({
      currentIndex: value
    });
  },

  render () {
    
    var {currentIndex, finalMoveX} = this.state;
    var state = this.state;
    var moveX = state.touchEndX - state.touchStartX;
    var moveY = state.touchEndY - state.touchStartY;

    return (
        <div className="App"
             onTouchStart={this._onTouchStart}
             onTouchEnd={this._onTouchEnd}
             onTouchMove={this._onTouchMove}>
            app / {currentIndex}
            <Cards data={this.state.data}
                   currentIndex={currentIndex}
                   moveX={moveX}
                   finalMoveX={finalMoveX} />
        </div>
    );
  }

});

module.exports = App;

       
