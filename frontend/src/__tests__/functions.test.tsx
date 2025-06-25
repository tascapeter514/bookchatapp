import { formatDate, weeksAgo } from "../components/functions";


const mockDateString = '2023-11-14T10:27:45Z'

describe('formatDate and weeksAgo', () => {
    it('should give back a formatted date for string', () => {
        
        expect(formatDate(mockDateString)).toEqual({'day': 14, 'month': 'November', 'year': 2023})
    })

    it('should give the correct number of weeks past' ,() => {
        
        expect(weeksAgo(mockDateString)).toEqual(84)
    })

})