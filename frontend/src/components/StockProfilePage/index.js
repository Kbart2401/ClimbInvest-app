import StockDetails from '../StockDetails';
import './StockProfilePage.css';

const StockProfilePage = (props) => {

  const checkIfDescriptionAvailable = () => {
    return props.companyData.description === '' ? 'Company description coming soon!' : props.companyData.description
  }

  return (
    <>
      <div className='company-description-title'>Business Description
        <div className='company-description-body'>{checkIfDescriptionAvailable()}</div>
      </div>
      <StockDetails {...props} />
    </>
  )
}

export default StockProfilePage