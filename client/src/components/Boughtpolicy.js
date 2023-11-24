import React,{Component} from 'react';
import axios from 'axios';



class Boughtpolicy extends Component{

    constructor(props){
        super(props)
       this.state = {
          data: [],
          loading: true,
          error: null,
          username:this.props.user_name,
        };
    
      }
    async componentDidMount() {
        try {
          const response = await axios.post('http://localhost:3001/bought_policy', {
            username: this.state.username,
          });
      
          if (response.status === 200) {
            const data = response.data;
            this.setState({ data, loading: false });
            console.log(data); // Data received from the server
          } else {
            console.error('Failed to fetch data from the server');
          }
        } catch (error) {
          console.error('Error:', error);
        }
      }


      render() {
        const { data, loading, error } = this.state;
       
    
          return (
            <div>
              
              {loading ? (
                <p>Loading...</p>
              ) : error ? (
                <p>Error: {error.message}</p>
              ) : (
               
                <ul >
                   
                  {data.map((item) => (
                    <li key={item.plan_id} >
                        <div>policy: {item.policy_type}</div>
                        <div>plan: {item.plan_name}</div>
                        <div>start date: {item.start_date}</div>
                        <div>end date: {new Date(item.end_date).toISOString().split('T')[0]}</div>
                       

                     
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
          
          
          
      }

}
export default Boughtpolicy;