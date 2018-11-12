import PokerHand, { Result } from './PokerHand.js';
import Card from './PokerHand.js';

describe('PokerHand', () => {

	describe('compareWith()', () => {

		it(`ties`, () => {

			const hand1 = new PokerHand('AD KD QD JD TD');
			const hand2 = new PokerHand('4S 5s 8C as AD');

			expect(hand1.compareWith(hand2)).toBe(Result.WIN);

		});

	});

});