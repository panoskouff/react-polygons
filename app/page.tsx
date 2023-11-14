import { Center } from '#/atoms';
import { styled } from '#/styled-system/jsx';
// import { Space } from '#/atoms';

export default function HomeContent() {
  return (
    <styled.div
      border='1px solid black'
      borderRadius='5px'
      display='grid'
      gridTemplateColumns='5fr 2fr'
      h='100%'
    >
      <styled.div borderRight='1px solid black'>
        <Center css={{ minH: '100%' }}>
          {/* @todo add different maxW per breakpoint */}
          <styled.div w='100%' maxW='500px' h='100%'>
            <styled.div w='100%' paddingBottom='100%' position='relative'>
              <styled.svg
                position='absolute'
                boxShadow='inset 0 0 13px #535353'
                viewBox='0 0 100 100'
                preserveAspectRatio='xMinYMin slice'
              >
                <polygon id='quadrilateral' points='5,5 10,5 10,10 5,10' />
              </styled.svg>
            </styled.div>
          </styled.div>
        </Center>
        {/* <styled.div

          w='100%'
          maxW='100%'
          aspectRatio='1 / 1'
          // h='100%'
          // m='0 auto'
        >

        </styled.div> */}
        {/* <styled.div paddingBottom='100%' bg='red'>
          area 1
        </styled.div> */}
      </styled.div>
      <styled.div>todo add border here and remove from area 1</styled.div>
    </styled.div>
  );
}
