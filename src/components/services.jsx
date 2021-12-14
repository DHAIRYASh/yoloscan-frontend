import Viewer from "./Yolo"
export const Services = (props) => {
  return (
    <div id='services' className='text-center'>
      <div className='container'>
        <div className='section-title'>
          <h2>Web-Cam Input</h2>
          <p>
            Import a image to detect object classes in it.
          </p>
        </div>
       <Viewer></Viewer>
      </div>
    </div>
  )
}
