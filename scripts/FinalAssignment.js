/// <reference path="jquery-1.11.3.js" />

var shuffleAudioElement = document.getElementById("sound1");
var dealAudioElement = document.getElementById("sound2");

var TheDeck;
var playerHand =[];
var dealerHand = [];
var minPlayerScore;
var maxPlayerScore;
var PlayerScore;
var minDealerScore;
var maxDealerScore;
var DealerScore = "";
var delayTime = 100;
var dealerNextCardPosition = 5;
var playerNextCardPosition = 5;

var StandButton = document.getElementById("StandButton");
var HitButton = document.getElementById("HitButton");
var Dealbutton = document.getElementById("DealButton");

StandButton.addEventListener("click", stand);
HitButton.addEventListener("click", IssueCard);
Dealbutton.addEventListener("click", deal);

function card(minValue, maxValue, name, suit)
{
    this.minvalue = minValue;
    this.maxvalue = maxValue;
    this.name = name;
    this.suit = suit;
}

function newDeck()
{
    this.names = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King'];
    this.suits = ['Hearts', 'Diamonds', 'Spades', 'Clubs'];
    var cards = [];
    for (var s = 0; s < this.suits.length; s++)
        {
        for (var n = 0; n < this.names.length; n++)
            {
            if (n < 8)
               {
               cards.push(new card(n + 2, n + 2, this.names[n], this.suits[s]));
               }
            else
               {
               cards.push(new card(10, 10, this.names[n], this.suits[s]));
               }       
            }
            cards.push(new card(1, 11, 'Ace', this.suits[s]));
        }
    return cards;
}

function stand()
{
    StandButton.disabled = true;
    HitButton.disabled = true;
    IssueCardstoDealer();
    defineWinner()
    
}

function defineWinner()
{
    if (DealerScore<22)
    {
        if (DealerScore<PlayerScore)
        {
            alert("you won!");
        }
        else
        {
            if (DealerScore>PlayerScore)
            {
                alert("dealer won :(");
            }
            else
            {
                alert("draw ");
            }
        }
    }
    else
    {
        if (PlayerScore<22)
        {
            alert("you won!");
        }
    }
}

function IssueCardstoDealer()
{
    while (DealerScore < 18)
    {  
        IssueCardtoDealer();
        //if (DealerScore>PlayerScore) //if dealer can see players card uncoment this
        //{
        //    break;
        //}
    }
    
}

function IssueCardtoDealer()
{
    
    var dealerCardDiv;
    
    dealAudioElement.play();

    cardIndex = Math.floor(Math.random() * TheDeck.length);
    dealerHand.push(TheDeck[cardIndex]);
    TheDeck.splice(cardIndex, 1);
    //var dealerCards = ""; //old interface
    $(".dealerCard").remove();
    var dealerNextCardPosition = 5;
    for (var i = 0; i < dealerHand.length; i++) {
        //dealerCards = dealerCards + dealerHand[i].name + " of " + dealerHand[i].suit + ", "; //old interface
        
        dealerCardDiv = $('<div id="foo" class="dealerCard">' + dealerHand[i].name + " of " + dealerHand[i].suit + '</div>').appendTo("#dealerHand");
        dealerCardDiv.css("position", "absolute");
        dealerCardDiv.css("backgroundColor", "white");
        dealerCardDiv.css("width", "90px");
        dealerCardDiv.css("height", "120px");
        dealerCardDiv.css("left", dealerNextCardPosition + "px");
        dealerNextCardPosition += 95;
    }
    //document.getElementById("dealerHnd").innerHTML = dealerCards; //old interface
    totalDealerHand();
    
    document.getElementById("dealerScore").innerHTML = DealerScore;
    
    
}

function totalDealerHand()
{
    //copy from function totalPlayerHand()
    minDealerScore = 0;
    maxDealerScore = 0;
    for (var i = 0; i < dealerHand.length; i++) {
        minDealerScore = minDealerScore + dealerHand[i].minvalue;
        maxDealerScore = maxDealerScore + dealerHand[i].maxvalue;;
    }

    if (maxDealerScore < 22) {
        DealerScore = maxDealerScore;
    }
    else {
        DealerScore = minDealerScore;
    }
    
}

    function deal()
{
        $(".dealerCard").remove();
        $(".playerCard").remove();
        document.getElementById("playerScore").innerHTML = "";
        //document.getElementById("playerHnd").innerHTML = ""; //old interface
        document.getElementById("dealerScore").innerHTML = "";
        //document.getElementById("dealerHnd").innerHTML = ""; //old interface
        shuffleAudioElement.play();
        StandButton.disabled = false;
        HitButton.disabled = false;
        TheDeck = newDeck();
        playerHand = [];
        dealerHand = [];
        minPlayerScore=0;
        maxPlayerScore=0;
        PlayerScore=0;
        minDealerScore=0;
        maxDealerScore=0;
        DealerScore = 0;
        setTimeout(IssueCard, 1900);
        setTimeout(IssueCard, 2700);
       
    
    }
    function totalPlayerHand()
    {
        minPlayerScore = 0;
        maxPlayerScore = 0;
        for (var i = 0; i < playerHand.length; i++)
        {
            minPlayerScore = minPlayerScore + playerHand[i].minvalue;
            maxPlayerScore = maxPlayerScore + playerHand[i].maxvalue;;
        }
    
        if (maxPlayerScore<22)
        {
            PlayerScore = maxPlayerScore;
        }
        else
        {
            PlayerScore = minPlayerScore;
        }
        if (PlayerScore == 21) {
            HitButton.disabled = true;
        }
    }

    function IssueCard()
    {
        dealAudioElement.play();
    
        cardIndex = Math.floor(Math.random() * TheDeck.length);
        playerHand.push(TheDeck[cardIndex]);
        TheDeck.splice(cardIndex, 1);
        //var playerCards = ""; //old interface
        $(".playerCard").remove();
        var playerNextCardPosition = 5;
        for (var i = 0; i < playerHand.length; i++)
        {
            //playerCards = playerCards + playerHand[i].name + " of " + playerHand[i].suit + ", "; //old interface

            dealerCardDiv = $('<div id="foo" class="playerCard">' + playerHand[i].name + " of " + playerHand[i].suit + '</div>').appendTo("#playerHand");
            dealerCardDiv.css("position", "absolute");
            dealerCardDiv.css("backgroundColor", "white");
            dealerCardDiv.css("width", "90px");
            dealerCardDiv.css("height", "120px");
            dealerCardDiv.css("left", playerNextCardPosition + "px");
            playerNextCardPosition += 95;
        }
        //document.getElementById("playerHnd").innerHTML = playerCards; //old interface
        totalPlayerHand();
        document.getElementById("playerScore").innerHTML = PlayerScore;
        if (PlayerScore > 21) {
            HitButton.disabled = true;
            StandButton.disabled = true;
            alert("You lost :(");
        }
    }
    