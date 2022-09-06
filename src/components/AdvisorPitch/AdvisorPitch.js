// import { Menu, Switch, Divider, Tabs, Typography, Row, Col } from 'antd';
import React, { useState } from 'react';
import { Row, Col, Form, Menu, Tabs, Typography, Button, Input, Radio, Select, Cascader, DatePicker, Space, Modal } from 'antd';
import { Divider, Image, Card } from 'antd';
import './AdvisorPitch.css';
import MainTabs from '../../components/MainTabs/MainTabs'
import MTabs from '../../components/Tab/Tab'

// ---- Import Image ------ //
import amit_img from '../../assets/Amit.jpg'
import deepak_img from '../../assets/Deepak.jpg'
import jagjit_img from '../../assets/Jagjit.jpg'
import chandubhai_img from '../../assets/Chandubhai.jpg'
import sandeep_img from '../../assets/Sandeep.jpg'

const tabMenu = [
    {
      id: 'customerpitch',
      value: "Customer Pitch",
    },
    {
      id: 'advisorpitch',
      value: "Advisor Pitch"
    },
    
  ]
const { Title } = Typography;

const AdvisorPitch = () => {
    let { innerWidth: width, innerHeight: height } = window;
    const { TabPane } = Tabs;
    const [tabPosition, setTabPosition] = useState(width <= "374" ? "top" : width <= "424" ? "top" :
        width <= "767" ? "top" : width <= "1023" ? "top" : "left");

    return (
        <>
            <div className="Advisor-main">
            <MTabs style
                tabMenu={tabMenu}
                activeKey="advisorpitch"
                header="Presales Tools"
            />
                <div className="Advisorpitch-row-flex">
                    <Tabs tabPosition={tabPosition}  style={{ fontSize: '12px'}}
                     className='AdvisorPitch-Container'>
                        {/* style={{ marginLeft: '1vw', marginRight: '1vw', marginTop: '1vw', backgroundColor: 'white', fontWeight: 'bolder' }} */}
                        <TabPane tab="About Us" key="1"  className='AdvisorPitch'>
                            <div className="Advisorpitch-details-card-style ">
                                <div className="Advisorpitch-details-card-content-align">
                                    <h1 className="about-heading">About Us New</h1><Divider />
                                    <p className="about-paragraph">Edelweiss Tokio Life Insurance Company offers comprehensive protection plans to help you in the hour of need through options of both critical illnesses and life cover. The company helps you to chalk out your goals and create a secure and bright future for yourself and your loved ones.
                                        Edelweiss Tokio Life is a private sector insurance provider established in 2011. The company is a joint venture between Edelweiss Group of India, and Tokio Marine Holdings of Japan. It is among the fastest growing private players in the life insurance sector in India. Edelweiss Tokio Life provides a host of life insurance products aimed at providing high returns, guaranteed interest payments, child education needs, retirement benefits etc. for customers across a wide spectrum.</p>
                                    <p className="about-paragraph">The 5-pronged approach of the company of convenience, transparency, communication, fairness and commitment ensures an easy approach for your nominees. Edelweiss Tokio Life Insurance Company has an excellent claim settlement with a claim ratio of 93.29% where every genuine claim is settled in 24 hours.</p><br />
                                    <h2 className="about-head2">Benefits of Buying Edelweiss Tokio Life Insurance:</h2><br />
                                    <p className="about-paragraph">Qualified Advisors: The company provides well-qualifies advisors. It is really important to understand the requirements of the customer and therefore company recruits’ advisors with exceptional skills. The advisors have to go under rigorous training on a need identification-based approach.</p>
                                    <p className="about-paragraph">Customer Centric Approach: The motto of the company is "Insurance se badhkar hai aapki zaroorat". Edelweiss Tokio Life Insurance Company keeps the needs of the customer as their primary concern. They bring their resources and expertise together to help you shape your dreams without facing many obstacles.</p>
                                    <p className="about-paragraph">Simple Claims Process: Edelweiss Tokio Life Insurance company is known for the claims it settles. The claim process followed by the company is easy to understand as well as hassle free.</p>
                                    <p className="about-paragraph">High Rated Funds: This insurance company provides funds that have been given top ratings in their respective categories.</p>
                                    <p className="about-paragraph">Customizable plans: Edelweiss Tokio Life Insurance Company provides plans which have customizable options such as customizable payouts. The feature allows a policyholder to use plans according to his/her needs.</p>
                                </div>
                            </div>
                        </TabPane>
                        <TabPane tab="Benefits" key="2" className='AdvisorPitch'>
                            <div className="Advisorpitch-details-card-style ">
                                <div className="Advisorpitch-details-card-content-align">
                                    <h1 className="about-heading">Benefits fo being Advisor at Life</h1><Divider />
                                    <p className="about-paragraph">In the next ten years, India’s insurance market is expected to quadruple in size from its current state of $60 billion. However, despite being the second most populous nation, India’s insurance penetration rate is 3.42% far below the global average rate, which is 6.2% (Source: Insurance Report ‘Transformative Agenda for The Indian Insurance Industry and its Policy Framework’). As a result, Indian insurance sector still has large untapped potential. As someone who’s looking to ride this money wave through employment, one of the simplest jobs you can consider is that of an insurance agent.
                                        Insurance agents act as the final connecting link between the insurance company and the individual investor as a representative of the insurer. As an agent for life or general insurance company, you can enjoy a lot of benefits; monetary, social & personal.
                                        Here’s a list of nine unique benefits available to insurance agents:</p>
                                    <h2 className="about-head2">1. Start Earning at the Age of 18</h2>
                                    <p className="about-paragraph">One advantage of becoming an insurance agent is the ease of entry; most agents need to have completed only senior secondary school. Right after completing your 12th, you can become an insurance agent. All you need is love for the thrill of the hunt, the rush of a sale.</p>
                                    <h2 className="about-head2">2. Be Your Own Boss</h2>
                                    <p className="about-paragraph">If you have entrepreneurial inclinations and a passion for building your own business, perhaps you should try and become an insurance agent. When you work for yourself, you can work as per your schedule and also develop your own system for attracting and developing clients. The more you invest your time and resources, the more returns you can expect to get. You only need to have the right mindset to sell insurance in the rightful manner.</p>
                                    <h2 className="about-head2">3. Build a Stable Income and Control the Growth</h2>
                                    <p className="about-paragraph">The industry offers huge untapped earning potential, and once you become an agent, your income is only limited by your desire. Because of under-served insurance markets, there is always this opportunity of earning more with a little more effort.
                                        The best part is your one-time effort can build a long stream of cashflows, which can be maintained with minimal service efforts. Once you sell the policy, the earning doesn’t restrict to first year only. You will earn on the policy renewal as well, which can easily go up to 30 years. Thus, over a period, your regular income stabilizes, and every additional effort only increases your income further.</p>
                                    <h2 className="about-head2">4. Zero Investment Required</h2>
                                    <p className="about-paragraph">The only investments that you need to do are your time and efforts. There is no upper cap on the income that you can generate.</p>
                                    <h2 className="about-head2">5. Flexible Work Timings</h2>
                                    <p className="about-paragraph">Most office jobs require their employees to be at their desks at 9am in the morning and must sit through the day till 6 pm. However, insurance agents have flexible working timings. As an insurance agent, you can choose to work as per your convenience or also establish your own office away from home.
                                        If you are a homemaker, you can use the opportunity to become financially independent and contribute to your household income. Similarly, retired people too can create an additional income stream as an insurance agent by helping people understand and buy insurance plans. This also works as a great source of part-time income, for people who are already occupied with other jobs.
                                        Once you become an agent for insurance, you can choose the time and place you’d like to work.</p>
                                    <h2 className="about-head2">6. Make a Difference in People's Lives</h2>
                                    <p className="about-paragraph">Do you think that only professions like doctors and teachers can positively impact people's lives? Insurance agents are equally rewarded as their work helps people to build assets, take care of child education, transfer wealth from one generation to the next, plan for retirement and much more.
                                        Insurance industry offers you a golden opportunity to make a difference in people’s lives and the society. Insurance is that economic instrument which saves families and businesses from falling into the vicious cycle of poverty.
                                        As an insurance agent, you can change lives, and this feeling itself is greatly satisfying and should keep you in high spirits.</p>
                                    <h2 className="about-head2">7. Learn from Industry Experts</h2>
                                    <p className="about-paragraph">Once you become an agent of a reputed insurance company, you get a lot of opportunities to develop your personal and professional skills through the expert-led training programs. The training may include classroom instruction, field exposure and one-on-one coaching.
                                        The industry is keen on imparting training and development support to their agents, and thus, they provide additional training, organize seminar/workshops to help them learn more and network with other people. Once again as an insurance agent, you have a choice to learn from the best in the industry and keep yourself updated with the latest events.</p>
                                    <h2 className="about-head2">8. Say Good Bye to Paper Working the Digital World</h2>
                                    <p className="about-paragraph">Gone are those days when agents used to carry loads of brochures and policy documents to meet clients. Nowadays, you have all brochures and application forms available at your fingertips. As a modern insurance agent, you can simply carry a laptop or a tablet to present your insurance plans to your prospects and complete the formalities for customers.</p>
                                    <p className="about-paragraph">Even there is no need for a fat scheduler as you can use tablets (and even your smartphone) to manage leads, schedule appointments and explain products to the customer.</p>
                                    <h2 className="about-head2">9. Rewards & Recognition </h2>
                                    <p className="about-paragraph">You get an opportunity to experience various national & international recognition forums as an insurance agent. For example, Asia’s Trusted Life Insurance Agents and Advisors, and Million Dollar Round Table (MDRT) memberships are a few big recognition forums for life insurance agents. Qualifying for these awards could be rigorous but, can also project the agent on the international stage. For instance, Asia Trusted Life Insurance Agents and Advisors witness participation from six Asian countries— China, Hong Kong, Malaysia, India, Taiwan and Singapore (Source: Asia Trusted Life Insurance Agents and Advisors).
                                        While your commission earnings are always there, these awards and recognitions are a cherry on the cake.
                                        In a nutshell, if you are looking for careers where you can be your own boss, define your income by yourself, and help people build a financially stable future, becoming an insurance agent could be the thing for you.</p>
                                </div>
                            </div>
                        </TabPane>
                        <TabPane tab="Success Story" key="3" className='AdvisorPitch-Success-Story'>
                            <div>
                                <Row gutter={[40, 24]} justify="start">
                                    <Col xs={{ order: 1 }} sm={24} md={24} lg={{ order: 1 }} xl={{ order: 1 }} span={22}>
                                        <Row gutter={['', 24]}>
                                            <Col className="success-story" xs={24} sm={24} md={24} lg={24} xl={24} span={24}>
                                                <Title className="success-head">Our Success Stories</Title>

                                                <Form layout="horizontal" className="success-story-form">
                                                    <Col xs={24} sm={24} md={24} lg={24} xl={24} span={24}>
                                                        <div >
                                                            <Image src={amit_img} style={{ }} />
                                                        </div>
                                                        <h3 className="success-comments">- Amit Kumar, Construction Office Engineer</h3>
                                                    </Col>
                                                    <Col xs={24} sm={24} md={24} lg={24} xl={24} span={24}>
                                                        <h1 className="success-heading1">Amit Kumar,Winner of Digital East,Q1 (2016-17)</h1>
                                                        <p className="success-comments">On an everyday basis, Bluebeam helps create an environment where anything is possible in the creation and modification of PDFs. With the new release of Revu 11, users have even more functionality to work with such as the Format Painter. The capability to copy the formatted appearance from one annotation to another has spedup... Built documentation tremendously. Also, with the creation of Sets and the ability to split documents into multiple sections, Bluebeam has now evolved the process of forming maintenance manuals into a well-oiled machine On an everyday basis, Bluebeam helps create an environment where anything is possible in the creation and modification of PDFs. With the new release of Revu 11, users have even more functionality to work with such as the Format Painter. The capability to copy the formatted appearance from one annotation to another has spedup... Built documentation tremendously. Also, with the creation of Sets and the ability to split documents into multiple sections, Bluebeam has now evolved the process of forming maintenance manuals into a well-oiled machine.</p>

                                                    </Col>

                                                </Form>
                                            </Col>
                                            <Col className="success-story" xs={24} sm={24} md={24} lg={24} xl={24} span={24}>
                                                <Title className="success-head">Our Success Stories</Title>

                                                <Form layout="horizontal" className="success-story-form">
                                                    <Col xs={24} sm={24} md={24} lg={24} xl={24} span={24}>
                                                        <div>
                                                            <Image src={deepak_img} style={{}} />
                                                        </div>
                                                        <h3 className="success-comments">- Deepak Dhadotti , Construction Office Engineer</h3>
                                                    </Col>
                                                    <Col xs={24} sm={24} md={24} lg={24} xl={24} span={24}>
                                                        <h1 className="success-heading1">Deepak Dhadotti, Winner of Contests, Q1 (2016-17)</h1>
                                                        <p className="success-comments">Deepak Dhadotti grew up in Belgaum in an agricultural family, studied engineering and then joined the UK company, Moog, in the area of servo-controls. He travelled extensively in Asia and Europe, building deep experience – and also causing worry to his parents that he may marry a foreign woman. They arranged a marriage for him with a local bride, and he moved back to India eventually. Deepak started Servo Controls India with his brother, bagging orders from HAL and then the steel and power industry. Tie-ups with Russian companies and the Tata group have also proven lucrative.</p>

                                                    </Col>

                                                </Form>
                                            </Col>
                                            <Col className="success-story" xs={24} sm={24} md={24} lg={24} xl={24} span={24}>
                                                <Title className="success-head">Our Success Stories</Title>

                                                <Form layout="horizontal" className="success-story-form">
                                                    <Col xs={24} sm={24} md={24} lg={24} xl={24} span={24}>
                                                        <div>
                                                            <Image src={jagjit_img} style={{}} />
                                                        </div>
                                                        <h3 className="success-comments">- Jagjit Singh , Construction Office </h3>
                                                    </Col>
                                                    <Col xs={24} sm={24} md={24} lg={24} xl={24} span={24}>
                                                        <h1 className="success-heading1">Jagjit Singh, Winner of Contests,  (2017-18)</h1>
                                                        <p className="success-comments">Jagjit Singh Kapoor’s parents were displaced from Pakistan during the Partition, and he grew up in Doraha, Punjab. He started off in the wine business but then moved into beekeeping and exporting of honey products. A trip to the UK to chase a non-paying customer ended up opening his eyes to a whole new world of quality, processing and technology. Today, Kashmir Apiaries is the largest exporter of honey from India, and Singh started the National Bee Board to increase awareness and networking for beekeepers.</p>

                                                    </Col>

                                                </Form>
                                            </Col>
                                            <Col className="success-story" xs={24} sm={24} md={24} lg={24} xl={24} span={24}>
                                                <Title className="success-head">Our Success Stories</Title>

                                                <Form layout="horizontal" className="success-story-form">
                                                    <Col xs={24} sm={24} md={24} lg={24} xl={24} span={24}>
                                                        <div>
                                                            <Image src={chandubhai_img} style={{}} />
                                                        </div>
                                                        <h3 className="success-comments">- Chandubhai Virani , Construction Office Engineer</h3>
                                                    </Col>
                                                    <Col xs={24} sm={24} md={24} lg={24} xl={24} span={24}>
                                                        <h1 className="success-heading1">Chandubhai Virani, Winner of Digital East, P1 (2015-16)</h1>
                                                        <p className="success-comments">Chandubhai Virani and his brothers started selling chips in a local cinema in Rajkot, and today their company Balaji Wafers has a 65% market share in five states, holding out against local and MNC competitors. They first tried the fertiliser business and then running a hostel, before settling on chips and snacks. Adherence to quality helped them get early customers, followed by importing Japanese machines and taking loans to grow their factory.</p>

                                                    </Col>

                                                </Form>
                                            </Col>
                                            <Col className="success-story" xs={24} sm={24} md={24} lg={24} xl={24} span={24}>
                                                <Title className="success-head">Our Success Stories</Title>

                                                <Form layout="horizontal" className="success-story-form">
                                                    <Col xs={24} sm={24} md={24} lg={24} xl={24} span={24}>
                                                        <div>
                                                            <Image src={sandeep_img} style={{}} />
                                                        </div>
                                                        <h3 className="success-comments">- Sandeep Kapoor , Construction Office Engineer</h3>
                                                    </Col>
                                                    <Col xs={24} sm={24} md={24} lg={24} xl={24} span={24}>
                                                        <h1 className="success-heading1">Sandeep Kapoor, Winner of Contests 3, B1 (2016-17)</h1>
                                                        <p className="success-comments">Sandeep Kapoor grew up in Jodhpur, and worked in his grandfather’s photo studio. Later he joined ITC, getting exposure to Russia and China in the perfume business. He realised the potential of this sector in India, and returned to start Perfume Station. With a wide range of pricing and open minded customer care, he first expanded in Tier 2 and 3 cities before moving into the metros.</p>

                                                    </Col>

                                                </Form>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </div>
                        </TabPane>
                        <TabPane tab="Licensing Process" key="4" 
                        className='AdvisorPitch-Licensing'>
                            <div className='AdvisorPitch-Licensing-Container'>
                                <h1 className="about-heading">Our quick and easy steps to be an Agent</h1><Divider />
                                <h3 className="process">Process</h3>
                                <p className="about-paragraph">You can also become the part of the insurance sector, not as a policyholder, but as an agent. Follow any of the following ways if you want to become an agent:
                                    Walk into the nearest Insurance office of your chosen company and talk to the Agency Development Manager to understand the minute details about the process, earning potential and other related things</p>
                                <p className="about-paragraph">Visit chosen insurance company’s website and apply online. You should get a call back from the insurance company
                                    Mail your details to the agent recruitment department of your chosen insurance company (email ID should be available on the company website) and their recruitment team will connect you shortly. You can also call their help desk number to get more information
                                    Now-a-days, all reputed insurance companies have robust recruitment programs. It involves a step-by- step process starting from screening, followed by extensive in-house training and IRDAI exam. Once you clear the exam, you become an official insurance agent advisor. Below mentioned are the details of the recruitment process in general terms:</p>
                                <p className="about-paragraph">Screening interview: The first step to becoming an insurance agent will be a simple interaction at the nearest branch office of your chosen insurance company. The aim of this interview should be to know more about you and understand your fitment for the opportunity.</p>
                                <p className="about-paragraph">Career Seminar: In the second step, the roles, responsibilities and benefits of being an insurance agent will be explained to you. You will attend career seminar to get details of the insurance industry and your role as an insurance agent.</p>
                                <p className="about-paragraph">Project evaluation: At this stage, you will be enabled to decide whether the career of an insurance agent is the right option for you or not. You will get information about the sales process, typical targets, and expectations of your chosen insurance company.</p>
                                <p className="about-paragraph">Career interview: Generally, this is the final step which involves a Personal Interview round. Once you clear this round, you can become an agent and get a shot at making the most of the opportunities available in the insurance sector. Apart from licensing and product knowledge, being a successful independent insurance agent requires having the right personality for the job. Some businesses may require you to be a good manager, but this business is more than management – it is about effective need-analysis & right selling.</p>
                                <p className="about-paragraph">To establish yourself in this sector, it is important to be a people’s person. You should enjoy talking to anyone and has a deep desire to help others understand new things. Being comfortable at the birthday party of your friend or on a showroom sales floor is not the same as sitting with the strangers in their homes, where they have all the control, and you have to discuss their insurance needs and convince them to trust your persona, your knowledge and your advice.</p>
                                <p className="about-paragraph">Another equally important trait is discipline. Do you have the discipline and tenacity to make regular cold calls which are necessary to build the market base and grow your reputation as a trustworthy and knowledgeable agent? If you have all these within you, it’s time to talk about getting licensed.</p>
                                <p className="about-paragraph">Licensing: Though insurance is not different from any other business opportunity, it also comes with more unique considerations. First and foremost, is the licensing process. To become Life Insurance Agent in India, a candidate should pass IRDAI IC 38 pre-recruitment qualification exam. To become General Insurance Agent in India, a candidate should pass IRDA IC 38 Exam. On behalf of IRDAI (Insurance Regulatory and Development Authority of India), Agent pre-recruitment exam is conducted by institutes recognized by the regulator.</p>
                                <p className="about-paragraph">You must enroll yourself with the insurance company you like to be associated with. Only through that insurer, you will be able to appear for the examination. You should complete 50 hours of training from an IRDAI approved training institution to act as Life Insurance agent. If you are seeking license for the first time to act as composite (i.e. Life) insurance agent, you will have to complete 75 hours of training. The exam takes place online. Once you submit the answers to the multiple-choice questions, you will immediately get the result. The insurance license issued to you will stay valid for a period of three years.</p>
                            </div>
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        </>
    );
};
export default AdvisorPitch;