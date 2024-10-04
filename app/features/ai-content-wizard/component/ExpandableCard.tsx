import React from 'react';
import '../../../../styles/expandablecard.css';
interface ExpandableCardProps {
  heading: string;
  para: string;
}
const ExpandableCard: React.FC<ExpandableCardProps> = ({ heading, para }) => {
  return (
    <div className="expandable-card-container">
      <div className="card">
        <div className="panel-container">
          <div className="panel">
          {heading}
          </div>
          <p className='para'>
         {para}
          </p>
        </div>
      </div>
    </div>
  );
};
export default ExpandableCard;
 