import '../styles/Tutors.css'

function Tutors(props) {
  return (
    <div className="tutor-list">
      {props.tutorsList.map((item, index) => (
        <div className="kartu-tutor" key={index}>
          <img src={item.image} />
          <h3>{item.name}</h3>
          <p>{item.expertise}</p>
        </div>
      ))}
    </div>
  )
}

export default Tutors
