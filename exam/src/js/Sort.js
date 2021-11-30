import moment from "moment-timezone";

function Sort(itemss, sortConditions) {
  
    const sortDirection = sortConditions.split(',')[0];
    const byWhat = sortConditions.split(',')[1];
    
    const items = itemss.slice();

    switch (sortDirection) {
        case 'text-asc':
            items.sort((a, b) => {
                const textA = a[byWhat].toUpperCase();
                const textB = b[byWhat].toUpperCase();
                if (textA < textB) {
                    return -1;
                }
                if (textA > textB) {
                    return 1;
                }
                return 0;
            });
            break;
        case 'text-desc':
            items.sort((a, b) => {
                const textA = a[byWhat].toUpperCase();
                const textB = b[byWhat].toUpperCase();
                if (textA < textB) {
                    return 1;
                }
                if (textA > textB) {
                    return -1;
                }
                return 0;
            });
            break;
        case 'number-asc':
            items.sort(function(a, b) {
                return a[byWhat] - b[byWhat];
            });
            break;
        case 'number-desc':
            items.sort(function(a, b) {
                return b[byWhat] - a[byWhat];
            });
            break;
        case 'date-asc':
            items.sort(function(a, b) {
                return moment.tz(a[byWhat], "Europe/Vilnius").format('YYYYMMDDHHmm') - moment.tz(b[byWhat], "Europe/Vilnius").format('YYYYMMDDHHmm');
            });
            break;
        case 'date-desc':
            items.sort(function(a, b) {
                return  moment.tz(b[byWhat], "Europe/Vilnius").format('YYYYMMDDHHmm') - moment.tz(a[byWhat], "Europe/Vilnius").format('YYYYMMDDHHmm');
            });
            break;

            case 'totalvalue-asc':
            items.sort(function(a, b) {
                return a.price*a.quantity - b.price*b.quantity;
            });
            break;
        case 'totalvalue-desc':
            items.sort(function(a, b) {
                return  b.price*b.quantity - a.price*a.quantity;
            });
            break;
        default:
    }
    return items
}
export default Sort;