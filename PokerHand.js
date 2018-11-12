export class PokerHand {
  
    constructor(hand)
    {
        
        this.validSuits = [ 'S', 'C', 'D', 'H' ];
        this.validValues = { 1:'2',2:'3',3:'4',4:'5',5:'6',6:'7',7:'8',8:'9',9:'T',10:'J', 11:'Q',12: 'K',13: 'A'};
        this.valueIndexes =[0,3,6,9,12];
        this.suitIndexes = [1, 4, 7, 10 ,13];
        this.spaceIndexes = [2, 5, 8, 11];
        this.numberOfCharactersInAHand = 14;
        this.handInputString = hand;
        this.hand = [];
       
        this.handScore = 0;
        
        
        if(this.evaluateHandSyntax(this.handInputString))
            {
                this.addCardsToHand(this.handInputString);
                 this.handScore = this.getHighestHand();
                console.log(this.hand);
               
                
            }
        else {
            throw Error('Invalid input string. Please use the format of value,suit with a space between each card. Valid Values are 2,3,4,5,6,7,8,9,T,J,K,Q,A and valid Suit values are S,C,D,H.')
           // console.log('invalidHand');
        }
    }
        
    
	compareWith(pokerHand) {
        //var result = new Result;
        if(this.handScore > pokerHand.handScore)
            {
                return Result.WIN;
            }
        else if(this.handScore < pokerHand.handScore)
            {
                return Result.LOSS;
            }
        else 
            {
                return Result.TIE;
            }
        
	}  
     
    evaluateHandSyntax(handInputString)
    {
        var isValidHand = true;
        if(handInputString.length > this.numberOfCharactersInAHand)
            {
                isValidHand = false;
            }
        
        else {
         for (var i = 0; i < handInputString.length; i++) {
               if (this.valueIndexes.indexOf(i) > -1)
                   {
                       var keyID = this.getKeyByValue(this.validValues, handInputString[i].toUpperCase()); 
                       if(keyID === null)
                           {
                               isValidHand = false;
                           }
                     
                   }
                else if (this.suitIndexes.indexOf(i) > -1)
                    {
                        if(this.validSuits.indexOf(handInputString[i].toUpperCase()) === -1)
                            {
                               isValidHand = false;
                            }
                       
                    }
                else 
                    {
                        if(handInputString[i] != " ")
                            {
                                isValidHand = false;
                            }
                    }              
        }
      
      }
        
        return isValidHand;
        
    }
    
    addCardsToHand(handInputString)
    {
        for(var i = 0; i < this.handInputString.length; i+=3)
            {
                var card = new Card(handInputString[i].toUpperCase(), handInputString[i+1].toUpperCase());
                this.hand.push(card);
            }
    }
    
    getHighestHand()    {
        var hand = 1;
        var arrayOfValues = [];
        var arrayOfSuits = [];
        this.hand.forEach(function(element) { arrayOfValues.push(element.value);});         
        this.hand.forEach(function(element) { arrayOfSuits.push(element.suit);});
        
        
        //Sequential Values
        if(this.isArraySequential(arrayOfValues))
        {
           //Royal Flush
           if (arrayOfValues.indexOf(13) > -1 && arrayOfSuits.every( x => x === arrayOfSuits[0])) 
            {
                hand = 10;
            }
            //Straight Flush
            else if (arrayOfSuits.every( x => x === arrayOfSuits[0]))
            {
                     hand = 9;
            }
            //Straight
            else 
            {
                     hand = 5;
            }
        }
        //Flush
        else if(arrayOfSuits.every( x => x === arrayOfSuits[0]))
                {
                    hand = 6;
                }
        else
        {
            var duplicates = this.getPairs(arrayOfValues);
            //4 of a kind
            if(this.getKeyByValue(duplicates, 4) != null)
            {
                    hand = 8;
            }
            else if(this.getKeyByValue(duplicates, 3) != null)
            {
                if(this.getKeyByValue(duplicates, 2) != null)
                {
                    //full house
                    hand = 7;
                }
                else{
                    //three of a kind
                    hand = 4
                }
            }
            else if(this.getKeyByValue(duplicates, 2) != null)
                {
                    if(this.getKeyByValue(duplicates, 2) != null)
                        {
                            //two pair
                            hand = 3;
                        }
                    else
                        {
                    //pair
                            hand = 2;
                        }
                }
        }
        
        return hand;
    }
    
    getPairs(arrayOfValues) {
        var  duplicates = {};
        arrayOfValues.forEach(function(i) { duplicates[i] = (duplicates[i]||0) + 1;});
        
        return duplicates;
    }
    
    getKeyByValue(object, value) {
            return Object.keys(object).find(key => object[key] === value);
     }

    
    
    isArraySequential(arrayOfValues) {
        var isSequential = false;
        arrayOfValues.sort(function(a, b){return a-b});
        
        if((arrayOfValues[(arrayOfValues.length - 1)] - arrayOfValues[0]) === (arrayOfValues.length - 1))
            {
                isSequential = true;
            }
        else if (arrayOfValues.reduce((a,b) => a+b, 0) === 23) //sequential as ace can precede 2 on a straight
            {
                isSequential = true;
            }
       
        return isSequential;
    } 
   

}

export class Card {
    constructor(value, suit)
    {      
        this.value = value;
        this.suit = suit;       
    }
    
 
}

export const Result = {
	WIN: 1,
	LOSS: 2,
	TIE: 3
};

export default PokerHand;





