import moment from 'moment';

export interface DocNumberGeneratorOption {
  type: string;
  createdAt: Date;
  lastId: number;
  // collision: boolean; // if collision true + 1 paperId
}

export async function docNumberGenerator(
  options: DocNumberGeneratorOption
) {

  let docNumber: string = '';
  let paperId: any;

  // Check type for changing to a minimal context 
  switch (options.type.toLocaleLowerCase()) {
      case 'invoice':
        docNumber = 'IV';
        break;
      case 'taxinvoice':
        docNumber = 'TX';
        break;
      case 'receipt':
        docNumber = 'RC';
        break;
      case 'quotation':
        docNumber = 'QU';
        break;
      case 'contract':
        docNumber = 'CT';
        break;
      default:
        break;
  }

  // Get YYMMDD format from createdAt Date.
  const dateFormat = moment(options.createdAt).format('YYMMDD');

  // ID Auto Increment using lastId as base then add one.
  paperId = options.lastId ? options.lastId + 1 : 1;
  paperId = paperId.toString().padStart(3, '0');
  
  return docNumber = `${docNumber}${dateFormat}${paperId}`;
}