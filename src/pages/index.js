import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'
import styled from 'styled-components'
import herobkg from '../images/herobkg.jpg'
import Autograph from "../components/autograph"
import Headshot from "../components/headshot"
import config from '../../config'

import { Layout, Article, Wrapper, Button, SectionTitle } from '../components'

const Content = styled.div`
  grid-column: 2;
  box-shadow: 0 4px 120px rgba(0, 0, 0, 0.1);
  border-radius: 1rem;
  padding: 3rem 6rem;
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    padding: 3rem 2rem;
  }
  @media (max-width: ${props => props.theme.breakpoints.phone}) {
    padding: 2rem 1.5rem;
  }
  overflow: hidden;
`
const Hero = styled.div`
  -moz-align-items: center;
		-webkit-align-items: center;
		-ms-align-items: center;
		align-items: center;
		background-image: url(${herobkg});
		display: -moz-flex;
		display: -webkit-flex;
		display: -ms-flex;
		display: flex;
		padding: 6em 0 2em 0 ;
		background-attachment: fixed;
		background-position: center;
		background-repeat: no-repeat;
		background-size: cover;
		border-bottom: 0 !important;
		cursor: default;
		height: 60vh;
		margin-bottom: -3.25em;
		max-height: 32em;
		min-height: 22em;
		position: relative;
		top: -3.25em;

    @:after {
			-moz-transition: opacity 2.5s ease;
			-webkit-transition: opacity 2.5s ease;
			-ms-transition: opacity 2.5s ease;
			transition: opacity 2.5s ease;
			-moz-transition-delay: 0.75s;
			-webkit-transition-delay: 0.75s;
			-ms-transition-delay: 0.75s;
			transition-delay: 0.75s;
			pointer-events: none;
			background-color: #242943;
			content: '';
			display: block;
			height: 100%;
			left: 0;
			opacity: 0.85;
			position: absolute;
			top: 0;
			width: 100%;
			z-index: 1;
		}
`
const HeroTitle = styled.div `
font-size: 3.25em;
min-height: 30em;
max-height: 50em;
width: auto;
`

const HeroContent = styled.div `
  -moz-transition: opacity 1.5s ease, -moz-transform 0.5s ease-out, -moz-filter 0.5s ease, -webkit-filter 0.5s ease;
    -webkit-transition: opacity 1.5s ease, -webkit-transform 0.5s ease-out, -webkit-filter 0.5s ease, -webkit-filter 0.5s ease;
	-ms-transition: opacity 1.5s ease, -ms-transform 0.5s ease-out, -ms-filter 0.5s ease, -webkit-filter 0.5s ease;
	transition: opacity 1.5s ease, transform 0.5s ease-out, filter 0.5s ease, -webkit-filter 0.5s ease;
	padding: 0 !important;
	position: relative;
	z-index: 2;
  
  text-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
  color: ${props => props.theme.colors.grey.dark};

  display: -moz-flex;
	display: -webkit-flex;
	display: -ms-flex;
	display: flex;
	-moz-align-items: center;
	-webkit-align-items: center;
	-ms-align-items: center;
	align-items: center;
	margin: 0 0 2em 0;
`

const HeroDemo = styled.div `
    grid-area: video;
`

const ImageWrapper = styled.div `
  max-width: 320px;
  margin-bottom: 1.45rem;
`

const IndexPage = ({
  data: {
    allMdx: { edges: postEdges },
  },
}) => (
  <Layout>
    <Hero>
    
    <HeroTitle><h1>{config.siteTitle}</h1></HeroTitle>
      <HeroContent>
        <ImageWrapper>
        <Headshot />
        </ImageWrapper>
        <ImageWrapper>
        <Autograph />
        </ImageWrapper>
       
    <HeroDemo>
    <Link to="/contact">
          <Button big>
            <svg width="1792" height="1792" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
              <path d="M1764 11q33 24 27 64l-256 1536q-5 29-32 45-14 8-31 8-11 0-24-5l-453-185-242 295q-18 23-49 23-13 0-22-4-19-7-30.5-23.5t-11.5-36.5v-349l864-1059-1069 925-395-162q-37-14-40-55-2-40 32-59l1664-960q15-9 32-9 20 0 36 11z" />
            </svg>
            Contact
          </Button>
        </Link>
        </HeroDemo>
    </HeroContent>
    </Hero>
    <Wrapper>
      
      <Content>
        <SectionTitle>Latest stories</SectionTitle>
        {postEdges.map(post => (
          <Article
            title={post.node.frontmatter.title}
            date={post.node.frontmatter.date}
            excerpt={post.node.excerpt}
            timeToRead={post.node.timeToRead}
            slug={post.node.fields.slug}
            categories={post.node.frontmatter.categories}
            key={post.node.fields.slug}
          />
        ))}
      </Content>
    </Wrapper>
  </Layout>
)

export default IndexPage

IndexPage.propTypes = {
  data: PropTypes.shape({
    allMdx: PropTypes.shape({
      edges: PropTypes.array.isRequired,
    }),
  }).isRequired,
}

export const IndexQuery = graphql`
  query IndexQuery {
    allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            date(formatString: "MM/DD/YYYY")
            categories
          }
          excerpt(pruneLength: 200)
          timeToRead
        }
      }
    }
  }
`


