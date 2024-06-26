import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import './filme.css';
import {toast} from 'react-toastify';

function Filme() {
  const {id} = useParams();
  const navegate = useNavigate();

  const [filme, setFilme]= useState({});
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    async function loadFilme(){
      await api.get(`/movie/${id}`, {
        params:{
        api_key: "ea8a3eddfafb12726795ad839e5b211c",
        language: "pt-BR",
      }
      })
      .then((response)=>{
        setFilme(response.data);
        setLoading(false);
      })
      .catch(()=>{
        console.log("Filme nao encontrado")
        navegate("/", { replace: true });
        return;
      })
    }

    loadFilme();


    return() => {
      console.log("companeite desmontado");
    }
  },[navegate, id])



   function salvaFilme(){ // salvando o filme no localstorage
     const minhaLista = localStorage.getItem("@primeflix")

     let filmesSalvos = JSON.parse(minhaLista) || [];

     const hastFilme = filmesSalvos.some((filmesSalvo) => filmesSalvo.id === filme.id)

     if(hastFilme){
      toast.warn("Esse filme ja esta na sua lista!") // alert usando uma api
      return;
     }
     filmesSalvos.push(filme);
     localStorage.setItem("@primeflix", JSON.stringify(filmesSalvos));
     toast.success("Filme salvo com sucesso!") // alert usando uma api

   }// salvando o filme no localstorage




  
  if(loading){
    return(
      <div className="filme-info">
        <h1>Carregando detalhes....</h1>
      </div>
    )
  }


    return (
      <div className="filme-info">
        <h1>{filme.title}</h1>
       <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title}/>

       <h3>Sinopse</h3>
       <span>{filme.overview}</span>
       <strong>Avaliação: {filme.vote_average} /10</strong>
       
       <div className="area-buttons">
         <button onClick={salvaFilme}>Salvar</button>

         <button>
          <a target="blank" rel='external' href={`https://youtube.com/results?search_query=${filme.title} Trailer`}>
            Trailler
          </a>
         </button>

       </div>


      </div>
    );
  }
  
  export default Filme;
  