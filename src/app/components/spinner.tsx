import { ThreeCircles } from 'react-loader-spinner'

export function Spinner() { 
      return (
        <ThreeCircles
        visible={true}
        height="100"
        width="100"
        color="#18181B"
        ariaLabel="three-circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
        />
      )
}