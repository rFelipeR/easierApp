import React, { useState } from 'react';
import { Steps, Form, Input, Button, Radio, Select, message, InputNumber, Switch, Row, Slider, Col, Modal, } from 'antd';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';
import style from './../styles/simulator.module.css'
import 'antd/dist/antd.css';
import Apolice, { addApolice } from '../interfaces/seguro_apolice';

interface CamposCalculo {
    tipo: TipoSeguro;
    //vida
    valorIndenizacao: number;
    tabagismo: boolean;
    obesidade: boolean;
    conjuge: boolean;
    idade: number;
    diagnosticoCancer: boolean;
    //veiculo
    fipe: number;
    tipoUso: TipoUso;
    contraTerceiros: boolean;
    regiaoMetropolitana: boolean;
    guincho: number;
    //residencial
    oscilacaoEnergia: boolean;
    desastresNaturais: boolean;
    incendiosExplosoes: boolean;
    furtosRoubos: boolean;
    valorAproximadoImovel: number;
}

export enum TipoSeguro {
    Residencial = 1,
    Veiculo = 2,
    Vida = 3
}
export enum TipoUso {
    Particular = 1,
    Trabalho = 2,
}

export default function Simulator() {

    const { Step } = Steps
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [current, setCurrent] = useState(0);
    const [total, setTotal] = useState(0);
    const parcel = total / 12;
    // const [simulationValues, setSimulationValues] = useState<CamposCalculo>();
    const [simulationValues, setSimulationValues] = useState({
        obesidade: false, tabagismo: false, conjuge: false, regiaoMetropolitana: false,
        incendiosExplosoes: true, contraTerceiros: true, desastresNaturais: true, oscilacaoEnergia: true,
        tipoUso: TipoUso.Particular
    } as CamposCalculo);

    const next = () => { setCurrent(current + 1); };
    const prev = () => { setCurrent(current - 1); };

    const type_options = [
        { label: "Residencial", value: TipoSeguro.Residencial },
        { label: 'Veículo', value: TipoSeguro.Veiculo },
        { label: 'Vida', value: TipoSeguro.Vida },
    ];

    const use_options = [
        { label: "Particular", value: TipoUso.Particular },
        { label: "Trabalho", value: TipoUso.Trabalho },
    ];

    const steps = [
        {
            title: '',
            content:
                <>
                    <div>
                        <p>Selecione o tipo do seguro:</p>
                        <Form.Item /*  label="Select" */>
                            <Radio.Group
                                size="large"
                                // buttonStyle={{minWidth:'79px'}}
                                options={type_options}
                                onChange={(e) => { setSimulationValues(prevState => ({ ...prevState, tipo: e.target.value }) as CamposCalculo) }}
                                optionType="button"
                            />
                        </Form.Item>
                    </div>
                </>,
        },
        {
            title: '',
            content:
                <>
                    {simulationValues?.tipo == TipoSeguro.Veiculo &&
                        <div>
                            <p onDoubleClick={() => console.log(simulationValues)}>Insira o valor do veículo na cotação FIPE </p>
                            <Form.Item>
                                <InputNumber
                                    addonBefore={'R$'}
                                    size="large"
                                    placeholder="0,00"
                                    width={150}
                                    style={{ textAlign: 'center' }}
                                    onChange={(e) => { setSimulationValues(prevState => ({ ...prevState, fipe: e }) as CamposCalculo) }}
                                />
                            </Form.Item>
                        </div>
                    }
                    {simulationValues?.tipo == TipoSeguro.Residencial &&
                        <div>
                            <p>Insira o valor aproximado da imóvel:</p>
                            <Form.Item>
                                <InputNumber
                                    addonBefore={'R$'}
                                    size="large"
                                    placeholder="0,00"
                                    width={150}
                                    style={{ textAlign: 'center' }}
                                    onChange={(e) => { setSimulationValues(prevState => ({ ...prevState, valorAproximadoImovel: e }) as CamposCalculo) }}
                                />
                            </Form.Item>
                        </div>
                    }
                    {simulationValues?.tipo == TipoSeguro.Vida &&
                        <div>
                            <p>Insira o valor da indenização:</p>
                            <Form.Item>
                                <InputNumber
                                    addonBefore={'R$'}
                                    size="large"
                                    placeholder="0,00"
                                    width={150}
                                    style={{ textAlign: 'center' }}
                                    onChange={(e) => { setSimulationValues(prevState => ({ ...prevState, valorIndenizacao: e }) as CamposCalculo) }}
                                />
                            </Form.Item>
                        </div>
                    }
                </>
        },
        {
            title: '',
            content:
                <>
                    {simulationValues?.tipo == TipoSeguro.Veiculo &&
                        <div>
                            <p>Tipo de uso do veículo</p>
                            <Form.Item>
                                <Radio.Group
                                    size="large"
                                    // buttonStyle={{ minWidth: '79px' }}
                                    options={use_options}
                                    onChange={(e) => { setSimulationValues(prevState => ({ ...prevState, tipoUso: e.target.value }) as CamposCalculo) }}
                                    optionType="button"
                                />
                            </Form.Item>
                        </div>
                    }
                    {simulationValues?.tipo == TipoSeguro.Residencial &&
                        <div>
                            <p>Cobertura contra incêndios e explosões:</p>
                            <Form.Item style={{ textAlign: 'center' }}>
                                <Switch
                                    onChange={(e) => { setSimulationValues(prevState => ({ ...prevState, incendiosExplosoes: e }) as CamposCalculo) }}
                                    checkedChildren={<span>Sim <CheckOutlined /></span>}
                                    unCheckedChildren={<span>Não <CloseOutlined /></span>}
                                    defaultChecked={true}
                                    style={{ fontSize: '1.5rem' }}
                                />
                            </Form.Item>
                        </div>
                    }
                    {simulationValues?.tipo == TipoSeguro.Vida &&
                        <>
                            <p>Idade:</p>
                            <Form.Item style={{ textAlign: 'center' }}>
                                <Row>
                                    <Col span={12}>
                                        <Slider
                                            min={1}
                                            max={90}
                                            onChange={(e) => { setSimulationValues(prevState => ({ ...prevState, idade: e }) as CamposCalculo) }}
                                            value={typeof simulationValues.idade === 'number' ? simulationValues.idade : 0}
                                        />
                                    </Col>
                                    <Col span={4}>
                                        <InputNumber
                                            min={1}
                                            max={90}
                                            style={{ margin: '0 16px' }}
                                            value={simulationValues.idade}
                                            onChange={(e) => { setSimulationValues(prevState => ({ ...prevState, idade: e }) as CamposCalculo) }}
                                        />
                                    </Col>
                                </Row>
                            </Form.Item>
                        </>}
                </>
        },
        {
            title: '',
            content:
                <div>
                    {simulationValues?.tipo == TipoSeguro.Veiculo &&
                        <>
                            <p>Cobertura contra terceiros</p>
                            <Form.Item style={{ textAlign: 'center' }}>
                                <Switch
                                    onChange={(e) => { setSimulationValues(prevState => ({ ...prevState, contraTerceiros: e }) as CamposCalculo) }}
                                    checkedChildren={<span>Sim <CheckOutlined /></span>}
                                    unCheckedChildren={<span>Não <CloseOutlined /></span>}
                                    defaultChecked={true}
                                    style={{ fontSize: '1.5rem' }}
                                />
                            </Form.Item>
                        </>}

                    {simulationValues?.tipo == TipoSeguro.Residencial &&
                        <>
                            <p>Cobertura contra vendaval e granizo:</p>
                            <Form.Item style={{ textAlign: 'center' }}>
                                <Switch
                                    onChange={(e) => { setSimulationValues(prevState => ({ ...prevState, desastresNaturais: e }) as CamposCalculo) }}
                                    checkedChildren={<span>Sim <CheckOutlined /></span>}
                                    unCheckedChildren={<span>Não <CloseOutlined /></span>}
                                    defaultChecked={true}
                                    style={{ fontSize: '1.5rem' }}
                                />
                            </Form.Item>
                        </>}
                    {simulationValues?.tipo == TipoSeguro.Vida &&
                        <>
                            <p>Possui obesidade?</p>
                            <Form.Item style={{ textAlign: 'center' }}>
                                <Switch
                                    onChange={(e) => { setSimulationValues(prevState => ({ ...prevState, obesidade: e }) as CamposCalculo) }}
                                    checkedChildren={<span>Sim <CheckOutlined /></span>}
                                    unCheckedChildren={<span>Não <CloseOutlined /></span>}
                                    defaultChecked={false}
                                    style={{ fontSize: '1.5rem' }}
                                />
                            </Form.Item>
                        </>}
                </div>
        },
        {
            title: '',
            content:
                <div>
                    {/* simulationValues?.tipo == TipoSeguro.Veiculo ||*/ simulationValues?.tipo == TipoSeguro.Residencial &&
                        <>
                            <p>Cobertura contra roubos/furtos:</p>
                            <Form.Item style={{ textAlign: 'center' }}>
                                <Switch
                                    onChange={(e) => { setSimulationValues(prevState => ({ ...prevState, furtosRoubos: e }) as CamposCalculo) }}
                                    checkedChildren={<span>Sim <CheckOutlined /></span>}
                                    unCheckedChildren={<span>Não <CloseOutlined /></span>}
                                    defaultChecked={true}
                                    style={{ fontSize: '1.5rem' }}
                                />
                            </Form.Item>
                        </>}

                    {simulationValues?.tipo == TipoSeguro.Veiculo &&
                        <>
                            <p>Cobertura contra roubos/furtos:</p>
                            <Form.Item style={{ textAlign: 'center' }}>
                                <Switch
                                    onChange={(e) => { setSimulationValues(prevState => ({ ...prevState, furtosRoubos: e }) as CamposCalculo) }}
                                    checkedChildren={<span>Sim <CheckOutlined /></span>}
                                    unCheckedChildren={<span>Não <CloseOutlined /></span>}
                                    defaultChecked={true}
                                    style={{ fontSize: '1.5rem' }}
                                />
                            </Form.Item>
                        </>}

                    {simulationValues?.tipo == TipoSeguro.Vida &&
                        <div>
                            <p>Possui histórico de tabagismo?</p>
                            <Form.Item style={{ textAlign: 'center' }}>
                                <Switch
                                    onChange={(e) => { setSimulationValues(prevState => ({ ...prevState, tabagismo: e }) as CamposCalculo) }}
                                    checkedChildren={<span>Sim <CheckOutlined /></span>}
                                    unCheckedChildren={<span>Não <CloseOutlined /></span>}
                                    defaultChecked={false}
                                    style={{ fontSize: '1.5rem' }}
                                />
                            </Form.Item>
                        </div>
                    }

                </div>
            ,
        },
        {
            title: '',
            content: <div>
                {simulationValues?.tipo == TipoSeguro.Veiculo &&
                    <>
                        <p>Residência ou uso se dá em região metropolitana?</p>
                        <Form.Item style={{ textAlign: 'center' }}>
                            <Switch
                                onChange={(e) => { setSimulationValues(prevState => ({ ...prevState, regiaoMetropolitana: e }) as CamposCalculo) }}
                                checkedChildren={<span>Sim <CheckOutlined /></span>}
                                unCheckedChildren={<span>Não <CloseOutlined /></span>}
                                defaultChecked={false}
                                style={{ fontSize: '1.5rem' }}
                            />
                        </Form.Item>
                    </>}
                {simulationValues?.tipo == TipoSeguro.Residencial &&
                    <>
                        <p>Cobertura contra danos causados por oscilações de energia?</p>
                        <Form.Item style={{ textAlign: 'center' }}>
                            <Switch
                                onChange={(e) => { setSimulationValues(prevState => ({ ...prevState, oscilacaoEnergia: e }) as CamposCalculo) }}
                                checkedChildren={<span>Sim <CheckOutlined /></span>}
                                unCheckedChildren={<span>Não <CloseOutlined /></span>}
                                defaultChecked={true}
                                style={{ fontSize: '1.5rem' }}
                            />
                        </Form.Item>
                    </>}
                {simulationValues?.tipo == TipoSeguro.Vida &&
                    <>
                        <p>Indenização por morte ou invalidez do cônjuge?</p>
                        <Form.Item style={{ textAlign: 'center' }}>
                            <Switch
                                onChange={(e) => { setSimulationValues(prevState => ({ ...prevState, conjuge: e }) as CamposCalculo) }}
                                checkedChildren={<span>Sim <CheckOutlined /></span>}
                                unCheckedChildren={<span>Não <CloseOutlined /></span>}
                                defaultChecked={false}
                                style={{ fontSize: '1.5rem' }}
                            />
                        </Form.Item>
                    </>}


            </div>
        }
    ];

    const saveApolice = () => {
        let premio = simulationValues.tipo == TipoSeguro.Residencial ? simulationValues.valorAproximadoImovel : (simulationValues.tipo == TipoSeguro.Veiculo ? simulationValues.fipe : simulationValues.valorIndenizacao)
        console.log('premio', premio);
        let franquia = simulationValues.tipo == TipoSeguro.Vida ? 0 : premio * 0.05;
        console.log('franquia', franquia);

        const newApolice = { premio: premio, tipo: TipoSeguro[simulationValues.tipo], franquia: franquia, nomeCliente: 'Felipe (teste)' } as Apolice;
        // if (values.furtosRoubos)
        //     newApolice.cobertura.push(0: 'Furto e Roubos' })
        addApolice(newApolice).then(x => {
            alert('Salvo!')
            //handleGet()
        }).catch(error => console.log(error));
    }

    const calcularSimulacao = () => {
        if (simulationValues?.tipo == TipoSeguro.Veiculo) {
            let fipe = simulationValues.fipe;
            let uso = simulationValues.tipoUso == TipoUso.Particular ? 1.04 : 1.02;
            let cobreTerceiros = simulationValues.contraTerceiros ? 1.03 : 1;
            let eMetropole = simulationValues.regiaoMetropolitana ? 1.02 : 1;
            let cobreRoubosFurtos = simulationValues.furtosRoubos ? 1.03 : 1;

            let resultado = ((((fipe * uso) * cobreTerceiros) * eMetropole) * cobreRoubosFurtos) - fipe;
            setTotal(resultado)
        }
        else if (simulationValues?.tipo == TipoSeguro.Residencial) {
            let valorBase = simulationValues.valorAproximadoImovel * 0.0025;
            let desastresNaturais = simulationValues.desastresNaturais ? 1.025 : 1;
            let danosEletricos = simulationValues.oscilacaoEnergia ? 1.02 : 1;
            let cobreRoubosFurtos = simulationValues.furtosRoubos ? 1.02 : 1;
            let cobreIncendios = simulationValues.incendiosExplosoes ? 1.02 : 1;

            let resultado = ((((valorBase * desastresNaturais) * danosEletricos) * cobreIncendios) * cobreRoubosFurtos);
            setTotal(resultado)
        }
        else {
            let valorIndenizacao = simulationValues.valorIndenizacao * 0.005;
            let obesidade = simulationValues.obesidade ? 1.02 : 1;
            let tabagismo = simulationValues.tabagismo ? 1.02 : 1;
            let coberturaConjuge = simulationValues.conjuge ? 1.05 : 1;
            let idade =
                ((simulationValues.idade > 0 && simulationValues.idade <= 25) ?
                    1.01 :
                    (simulationValues.idade > 25 && simulationValues.idade <= 40) ?
                        1.02 :
                        (simulationValues.idade > 40 && simulationValues.idade <= 55) ?
                            1.03 :
                            (simulationValues.idade > 55 && simulationValues.idade <= 70) ?
                                1.045 : 1.08
                );

            let resultado = ((((valorIndenizacao * idade) * obesidade) * tabagismo) * coberturaConjuge);
            setTotal(resultado)
        }
        setIsModalVisible(true)
    }

    return (
        <div className={style.simulator_content}>
            <div className={style.header_steps}>
                <Steps responsive={true} current={current}>
                    {steps.map(item => (
                        <Step key={item.title} title={item.title} />
                    ))}
                </Steps>
            </div>
            <div className={`steps-content ${style.step_content}`}>{steps[current].content}</div>
            <div className={`steps-action ${style.step_footer}`}>
                {
                    current > 0 && (
                        <Button style={{ margin: '0 8px' }} onClick={() => prev()}>Anterior</Button>)
                }
                {
                    current < steps.length - 1 && (
                        <Button type="primary" onClick={() => next()}>Avançar</Button>
                    )
                }
                {
                    current === steps.length - 1 && (
                        <Button type="primary" onClick={() => [/* message.success('Processing complete!') */ calcularSimulacao(), console.log('simulationValues:', simulationValues)]}>Finalizar</Button>
                    )
                }
            </div>
            <Modal title={false} okText="Enviar para análise" visible={isModalVisible} onOk={() => [saveApolice(), setIsModalVisible(false)]} onCancel={() => setIsModalVisible(false)}>
                <div style={{ textAlign: 'center' }}>
                    <h2>Simulação concluída <CheckOutlined color="green" /></h2>
                    <h4>A cotação para contratar é de R$ {total.toFixed(2)}</h4>
                    <h4>Em até 12x de <span style={{ backgroundColor: 'green', color: 'white', padding: '.25rem', borderRadius: '3%' }}> apenas R$ {parcel.toFixed(2)}/mês</span></h4>
                </div>
            </Modal>
        </div >
    );
}