import PropTypes from 'prop-types';

export default function Section({ title, children }) {
  return (
    <section>
      <div>
        {title && <h2>{title}</h2>}
        {children}
      </div>
    </section>
  );
}

Section.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};