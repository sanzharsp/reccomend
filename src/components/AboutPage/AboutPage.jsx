import './AboutPage.css'
import TextAnim from '../Animation/PrintsTextAnim'



const AboutPage = () => {


    return(
        <div className="about_page" >

       
 
        <div className="container_about text_before_after">

            <h1>Біз туралы</h1>
          
          
            </div>
   
            <div className="text_anim_style ">
            <TextAnim  width={62} text_main={"Біздің жүйемен ең маңызды әлеуметтік медиа ұсыныстарын алыңыз!"} />
            
            
        <div className="Content_container">
   
       <TextAnim  width={11} text_main={"(RECOMMEND)"} />
       <div className="castom_text_design">
       <div className="container_about_text_design">
         <h1 className="text_about_pages">Әлеуметтік желілердің ұсыныстары-бізбен бірге!»</h1>
       </div>
     </div>
        </div>
            <div className="text_container">
  
            <h4 className="text_about_us" style={{justifyContent:'center',textAlign:'center'}} >
            Біздің компания әлеуметтік желілердің деректерін талдау негізінде ұсынымдық жүйелерді әзірлеумен айналысады. Біз әр клиентке жеке көзқараспен қараймыз және оларға конверсияның жоғарылауына, сатылымның өсуіне, клиенттердің адалдығының жақсаруына және т. б. байланысты мәселелерді шешуге көмектесеміз.

Біздің ұсыныс жүйелеріміз мәтінді талдау, деректерді кластерлеу, бірлескен сүзу және т.б. сияқты машиналық оқытудың әртүрлі әдістерін пайдаланады.
</h4>

        </div>







        
        <div className="text_container">
        <h4 className="text_about_us" style={{justifyContent:'center',textAlign:'center'}}>
Біздің команда Сізге тиімді ұсыныс жүйесін құруға көмектесуге дайын тәжірибелі Машиналық оқыту және деректерді талдау мамандарынан тұрады. Біз сондай-ақ жүйені ағымдағы инфрақұрылымға біріктіру және оны одан әрі қолдау бойынша кеңес береміз.

Әлеуметтік медиа деректерін талдауға негізделген біздің ұсыныс жүйеміздің көмегімен сіз аудиториямен қарым-қатынасты жақсарта аласыз және тұтынушылардың қанағаттану деңгейін арттыра аласыз. Сонымен қатар, біз сізге мақсатты аудиторияның қажеттіліктері мен мүдделері туралы дәлірек түсінік алуға көмектесеміз, бұл сізге тиімді маркетингтік науқандарды дамытуға мүмкіндік береді.</h4>
        </div> 
        </div>
    

        <h4 className="text_brain" style={{justifyContent:'center',textAlign:'center'}}>"«Тәжірибеңізді оңтайландырыңыз: біздің Нұсқаулық жүйесі сізге әлеуметтік медианы барынша пайдалануға көмектеседі!»."</h4>
 
        <div className="day-night-circle">
        
        <div className="sun"></div>
        <div className="moon">
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className="stars">
        
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
       
        <div className="water"></div>
   
        </div>
        <div className="paddings"/>
     


        </div>
    )
}



export default AboutPage;