import StockDetails from '../StockDetails';
import { FaPhoneAlt } from 'react-icons/fa';
import './StockProfilePage.css';

const StockProfilePage = (props) => {

  const checkIfDescriptionAvailable = () => {
    return props.companyData.description === '' ? 'Business description not available' : props.companyData.description
  }

  return (
    <>
      <div className='company-profile-container'>
        <div className='company-description-title'>Business Description
        <div className='company-description-body'>{checkIfDescriptionAvailable()}</div>
        </div>
        <div style={{ display: 'flex', width: '90%' }}>
          <table className='company-profile-execs'>
            <caption>Key Executives</caption>
            <tbody>
              <tr>
                <td style={{ fontWeight: '800' }}>{props.companyData.CEO}</td>
                <td>Chief Executive Officer</td>
              </tr>
            </tbody>
          </table>
          <div className='company-profile-contact'>
            <h3>Contact Information</h3>
            <address>
              <div className='row' style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div className='company-address'>
                  <div style={{ fontWeight: '800' }}>{props.companyData.companyName}</div>
                  <div>{props.companyData.address}</div>
                  <div>{props.companyData.city}, {props.companyData.state}</div>
                  <div>{props.companyData.zip}</div>
                </div>
                <div className='company-contact-info'>
                  <div>
                    <span><FaPhoneAlt /></span>
                    <a href={`tel:${props.companyData.phone}`}>{props.companyData.phone}</a>
                  </div>
                  <div>
                    <a href={props.companyData.website}>{props.companyData.website}</a>
                  </div>
                </div>
              </div>
            </address>
          </div>
        </div>
      </div>
      <StockDetails {...props} />
    </>
  )
}

export default StockProfilePage