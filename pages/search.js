import {  Col, Row, Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useAtom } from 'jotai';
import { searchHistoryAtom } from '../store';
import {addToHistory} from "../lib/userData";
import {useEffect } from 'react';
const AdvancedSearch = () => {

    const router = useRouter();
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
    const {register, handleSubmit, setValue, formState: {errors}} = useForm({
        defaultValues:{
            searchBy:"",
            geoLocation:"",
            medium:"",
            isHighlight:false,
            isOnView:false,
            q: ""
        }
    });

    useEffect(()=>{
        let data = {
            searchBy:"title",
            geoLocation:"",
            medium:"",
            isHighlight:false,
            isOnView:false,
            q: ""
        }

        for(const prop in data){
            setValue(prop, data[prop]);
        }
    })

    function submitForm(data){
        let queryString = "";
        queryString = `${data.searchBy}=true`

        if(data.geoLocation){
            queryString += `&geoLocation=${data.geoLocation}`
        }

        if(data.medium){
            queryString += `&medium=${data.medium}`
        }
        setSearchHistory(current => [...current, queryString]);
        queryString +=`&isOnView=${data.isOnView}`
        queryString +=`&isHighlight=${data.isHighlight}`
        queryString +=`&q=${data.q}`

        router.push(`/artwork?${queryString}`);
    }
    return (
        <>
            <Form onSubmit={handleSubmit(submitForm)}>
                <Row>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Search Query</Form.Label>
                            <Form.Control className={errors.q?.type === "required" && "is-invalid"}
                                type="text" 
                                placeholder="" 
                                name="q"
                                {...register("q", {required:true})} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={4}>
                        <Form.Label>Search By</Form.Label>
                        <Form.Select name="searchBy"
                                     className="mb-3" 
                                     {...register("searchBy")}>
                            <option value="title">Title</option>
                            <option value="tags">Tags</option>
                            <option value="artistOrCulture">Artist or Culture</option>
                        </Form.Select>
                    </Col>
                    <Col md={4}>
                        <Form.Group className="mb-3">
                            <Form.Label>Geo Location</Form.Label>
                            <Form.Control type="text" 
                                          placeholder="" 
                                          name="geoLocation"  
                                          {...register("geoLocation")} />
                            <Form.Text className="text-muted">
                                Case Sensitive String (ie Europe&quot; France&quot; Paris&quot; &apos;China&apos;&quot; &apos;New York&apos;&quot; etc)&quot; with multiple values separated by the | operator
                            </Form.Text>
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group className="mb-3">
                            <Form.Label>Medium</Form.Label>
                            <Form.Control type="text" 
                                          placeholder="" 
                                          name="medium"  
                                          {...register("medium")}/>
                            <Form.Text className="text-muted">
                                Case Sensitive String (ie: &apos;Ceramics&apos;&quot; &apos;Furniture&apos;&quot; &apos;Paintings&apos;&quot; &apos;Sculpture&apos;&quot; &apos;Textiles&apos;&quot; etc.), with multiple values separated by the | operator
                            </Form.Text>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Check
                            type="checkbox"
                            label="Highlighted"
                            name="isHighlight"
                            {...register("isHighlight")}
                        />
                        <Form.Check
                            type="checkbox"
                            label="Currently on View"
                            name="isOnView"
                            {...register("isOnView")}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <br />
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Col>
                </Row>
            </Form>
        </>
    );
}

export default AdvancedSearch