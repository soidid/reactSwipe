/** @jsx React.DOM */

var React = require('react/addons');
require('./Cards.css');

var Cards = React.createClass({

  getInitialState(){
        return {
        	cumulatedX: 0
        }
  },

  componentWillReceiveProps( nextProps, nextContext){
        console.log(nextProps);
        if(nextProps.currentIndex !== this.props.currentIndex){
        	console.log("*** index changed ***");
        	
        	//Get current translate
        	var node = this.refs.cardsContent.props.style.transform;
        	var currentTranslatedX = Number(node.split("(")[1].split("p")[0]);
        	console.log(currentTranslatedX);
        }

  },
  render () {

  	var {data, currentIndex, moveX, finalMoveX, isMoving} = this.props;
  	var classSet = React.addons.classSet;

  	var cardItems = data
    // .filter((value)=>{
    // 	return value === currentIndex;
    // })
  	.map((item, key)=>{
  		var cardClasses = classSet({
            "Cards-card" : true,
            "is-odd" : key%2 !== 0
  		});
        return (
        	<div className={cardClasses}
        	     key={key}
        	     >{item}</div>
        )
  	});

    console.log("isMoving:"+isMoving);

    if(!finalMoveX && isMoving === true){
    	var currentX = currentIndex * -320 + moveX;
    	var style = {
            "-ms-transform": "translate3d("+currentX+"px,0,0)",  /* IE 9 */
            "-webkit-transform": "translate3d("+currentX+"px,0,0)", /* Chrome, Safari, Opera */
            transform: "translate3d("+currentX+"px,0,0)"
            
          }
    }else {
    	var currentX = currentIndex * -320;
    	var style = {
    		    "-ms-transform": "translate3d("+currentX+"px,0,0)",  /* IE 9 */
            "-webkit-transform": "translate3d("+currentX+"px,0,0)", /* Chrome, Safari, Opera */
            transform: "translate3d("+currentX+"px,0,0)",
            "transition-duration": "0.5s",
            "transition-timing-function": "ease-in-out"
    	};
    }
    console.log(moveX);
  	
    return (
        <div className="Cards-container">
            <div className="Cards-content"
                 style={style}
                 ref="cardsContent">
           	    {cardItems}
            </div>
        </div>
    );
  }
});

module.exports = Cards;


